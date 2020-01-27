import uuid
import werkzeug

import pandas as pd

from flask import jsonify
from flask_restful import Resource, Api, reqparse
from pandas import DataFrame

from .handler import create_csv_entry, fill_in_blank
from .models import CsvFileModel, to_dict

from typing import Dict


api: Api = Api()


class GetCsvFiles(Resource):
    @staticmethod
    def get() -> Dict:
        for row in CsvFileModel.query.all():
            row.csv_file = fill_in_blank(row.csv_file)

        return jsonify([to_dict(row) for row in CsvFileModel.query.all()])


post_parser: reqparse.RequestParser = reqparse.RequestParser()
post_parser.add_argument(
    "csv_file",
    type=werkzeug.FileStorage,
    location="files",
    required=True,
    help="The csv file",
)


class CreateCsvEntry(Resource):
    @staticmethod
    def post() -> Dict:
        request_args = post_parser.parse_args()

        file_id: uuid.UUID = create_csv_entry(
            model=CsvFileModel,
            filename=request_args.csv_file.filename,
            csv_file=request_args.csv_file,
        )
        return {"file_id": str(file_id)}


api.add_resource(GetCsvFiles, "/my-bank")
api.add_resource(CreateCsvEntry, "/upload")
