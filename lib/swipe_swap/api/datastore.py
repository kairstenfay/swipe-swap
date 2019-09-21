"""
Datastore abstraction for our database.
"""
import json
import logging
import psycopg2
from functools import wraps
from psycopg2 import DataError, DatabaseError, IntegrityError, ProgrammingError
from psycopg2.errors import InsufficientPrivilege
from typing import Any
from werkzeug.exceptions import Forbidden
from ..db.session import DatabaseSession
from .exceptions import AuthenticationRequired, BadRequest
from .utils import export


LOG = logging.getLogger(__name__)


def catch_permission_denied(function):
    """
    Decorator to catch :class:`psycopg2.ProgrammingError` exceptions with the
    ``INSUFFICIENT_PRIVILEGE`` error code and rethrow them as
    :class:`~werkzeug.exceptions.Forbidden` exceptions instead.
    """
    @wraps(function)
    def decorated(*args, **kwargs):
        try:
            return function(*args, **kwargs)

        except InsufficientPrivilege as error:
            LOG.error("Forbidden: %s", error)
            raise Forbidden()

    return decorated


@export
def login(username: str, password: str) -> DatabaseSession:
    """
    Creates a new database session authenticated as the given user.

    Returns an opaque session object which other functions in this module
    require.
    """
    LOG.debug(f"Logging into PostgreSQL database as '{username}'")

    try:
        return DatabaseSession(username = username, password = password)

    except DatabaseError as error:
        raise AuthenticationRequired() from None


@export
@catch_permission_denied
def store_individual(session: DatabaseSession, data: dict) -> None:
    """
    Store the given individual *data* in the database using *session*.

    Raises a :class:`BadRequestDatabaseError` exception if the given *data*
    isn't valid and a :class:`Forbidden` exception if the database reports a
    `permission denied` error.
    """
    data['details'] = json.dumps(data['details'])

    with session, session.cursor() as cursor:
        try:
            cursor.execute("""
                insert into warehouse.individual (username, first_name, last_name, details)
                    values (%(username)s, %(first_name)s, %(last_name)s, %(details)s)
                """, data)

        except (DataError, IntegrityError) as error:
            raise BadRequestDatabaseError(error) from None

        except TypeError as error:
            raise Exception(f"{type(data)}, {error}")


@export
class BadRequestDatabaseError(BadRequest):
    """
    Subclass of :class:`swipe-swap.api.exceptions.BadRequest` which takes a
    :class:`psycopg2.DatabaseError` and forms a JSON response detailing the
    error.

    This intentionally does not expose the query context itself, only the
    context related to the data handling.
    """
    def __init__(self, error: DatabaseError) -> None:
        super().__init__(
            error = error.diag.message_primary,
            extra = {
                "detail": error.diag.message_detail,
                "context": error.diag.context,
            }
        )
