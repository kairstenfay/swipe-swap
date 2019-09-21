"""
Swipe-Swap API
"""
import logging
from flask import Flask
from flask_cors import CORS
from . import config
from .routes import blueprints


LOG = logging.getLogger(__name__)
logging.getLogger('flask_cors').level = logging.DEBUG

def create_app():
    app = Flask(__name__)
    app.config.update(config.from_environ())

    # cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
    CORS(app)
    
    for blueprint in blueprints:
        app.register_blueprint(blueprint)

    LOG.debug(f"app root is {app.root_path}")
    LOG.debug(f"app static directory is {app.static_folder}")

    return app
