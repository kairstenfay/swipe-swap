"""
API route definitions.
"""
import json
import logging
from flask import Blueprint, request, send_file
from flask_cors import CORS, cross_origin
from . import datastore
from .utils.routes import authenticated_datastore_session_required, content_types_accepted, check_content_length


LOG = logging.getLogger(__name__)

api_v1 = Blueprint('api_v1', 'api_v1', url_prefix='/api/v1')
api_unversioned = Blueprint('api', 'api', url_prefix='/api')

blueprints = [
    api_v1,
    api_unversioned,
]

@api_unversioned.route("/", methods = ['GET'])
def index():
    """
    Show an index page with documentation.
    """
    return send_file("static/index.html", "text/html; charset=UTF-8")


@api_v1.route("/individual", methods = ['POST'])
@content_types_accepted(["application/json"])
@check_content_length
@authenticated_datastore_session_required
@cross_origin()
def individual(*, session):
    """
    Receive a new individual entity.

    POST /create/individual with a JSON body.  Note that we don't actually need to
    parse the JSON body.  The body is passed directly to the database which
    will check its validity.
    """
    data = json.loads(request.get_data(as_text = True))
    LOG.debug(f"Received individual {data}")

    datastore.store_individual(session, data)

    return "", 204
