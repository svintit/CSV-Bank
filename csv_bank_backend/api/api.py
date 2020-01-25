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
    dest="csv_file",
    location="form",
    required=True,
    help="The csv file",
)


class CreateCsvEntry(Resource):
    @staticmethod
    def post():
        request_args = post_parser.parse_args()

        new_entry: CreateCsvEntry = create_csv_entry(
            model=CreateCsvEntry,
            filename=request_args.filename,
            csv_file=request_args.csv_file,
        )
        return jsonify(to_dict(new_entry))


api.add_resource(GetCsvFiles, "/my-bank")
api.add_resource(CreateCsvEntry, "/upload")
