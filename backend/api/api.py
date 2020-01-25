from flask import jsonify
from flask_restful import Resource, Api

from .models import CsvFileModel, to_dict


api = Api()


class CsvFile(Resource):

    @staticmethod
    def get():
        return jsonify([to_dict(csv_file) for csv_file in CsvFileModel.query.all()])


api.add_resource(CsvFile, '/')
