import io
import json
import uuid
import werkzeug

import pandas as pd

from flask import jsonify
from flask_restful import Resource, Api, reqparse

from .handler import create_csv_entry, fill_in_blank
from .models import CsvFileModel, to_dict

from typing import Dict, List


api: Api = Api()


class GetCsvFiles(Resource):
    @staticmethod
    def get() -> List:
        from_db = CsvFileModel.query.with_entities(
            CsvFileModel.filename, CsvFileModel.created_at, CsvFileModel.file_id
        ).all()

        parsed = [to_dict(row) for row in from_db]

        return jsonify(parsed[::-1])


class GetSingleFile(Resource):
    @staticmethod
    def get(file_id) -> List:
        from_db = CsvFileModel.query.filter(CsvFileModel.file_id == file_id).all()

        for row in from_db:
            df = pd.read_csv(io.StringIO(row.csv_file))
            row.csv_file_columns = df.columns.to_list()
            row.csv_file = fill_in_blank(row.csv_file)

        arr = [to_dict(row) for row in from_db]

        return jsonify(arr)


class GetStats(Resource):
    @staticmethod
    def create_stats(df) -> Dict:
        series = df["date"]
        year_count = {}

        for _, cell in series.iteritems():
            year = cell.split("/")[-1]

            if year in year_count:
                year_count[year] += 1
            else:
                year_count[year] = 1

        return year_count

    @staticmethod
    def pretty_print(year_count):
        str_dict = "|| "
        i = 0
        for key in sorted(year_count.keys()):
            str_dict += f"<strong>{key}:</strong> {year_count[key]} || "

            if i == 13:
                str_dict += "<br></br>|| "
                i = 0

            i += 1

        return str_dict

    def get(self, file_id) -> List:
        from_db = CsvFileModel.query.filter(CsvFileModel.file_id == file_id).all()

        df = pd.read_csv(io.StringIO(from_db[0].csv_file), delimiter=",")

        if "date" in df.columns:
            year_count = self.create_stats(df)
            str_dict = self.pretty_print(year_count)

            return jsonify(str_dict)

        else:
            return jsonify("No statistics available")


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
api.add_resource(GetSingleFile, "/my-bank/<string:file_id>")
api.add_resource(GetStats, "/stats/<string:file_id>")
api.add_resource(CreateCsvEntry, "/upload")
