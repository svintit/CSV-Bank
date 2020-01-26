import werkzeug
import uuid

from flask import jsonify
from flask_restful import Resource, Api, reqparse

from .handler import create_csv_entry
from .models import CsvFileModel, to_dict


api: Api = Api()


class GetCsvFiles(Resource):
    @staticmethod
    def get():
        return jsonify([to_dict(csv_file) for csv_file in CsvFileModel.query.all()])


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
    def post():
        request_args = post_parser.parse_args()

        file_id: uuid.UUID = create_csv_entry(
            model=CsvFileModel,
            filename=request_args.csv_file.filename,
            csv_file=request_args.csv_file,
        )
        return {"file_id": str(file_id)}


api.add_resource(GetCsvFiles, "/my-bank")
api.add_resource(CreateCsvEntry, "/upload")
