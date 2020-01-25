from flask import Flask
from flask_cors import CORS

from api.api import api
from api.models import db
from api.config import Config


def create_app(config):
    backend_app = Flask(__name__)
    CORS(backend_app)
    backend_app.config.from_object(config)
    register_extensions(backend_app)
    return backend_app


def register_extensions(backend_app):
    api.init_app(backend_app)
    db.init_app(backend_app)


app = create_app(Config)


# if __name__ == '__main__':
#     app = create_app(Config)
#     app.run(host='0.0.0.0', port=80, debug=True, threaded=True)
