from flask import Flask
from flask_cors import CORS
from typing import Type

from api.api import api
from api.models import db
from api.config import Config


def create_app(config: Type[Config]) -> Flask:
    backend_app: Flask = Flask(__name__)
    CORS(app=backend_app)
    backend_app.config.from_object(config)
    register_extensions(backend_app)
    return backend_app


def register_extensions(backend_app) -> None:
    api.init_app(app=backend_app)
    db.init_app(app=backend_app)


app: Flask = create_app(Config)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True, threaded=True)
