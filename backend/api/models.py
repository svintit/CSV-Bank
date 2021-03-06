import json

from sqlalchemy.dialects.postgresql import UUID
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.declarative import DeclarativeMeta


db = SQLAlchemy()


class CsvFileModel(db.Model):

    __tablename__ = "csv_files"
    file_id = db.Column(
        UUID(as_uuid=True), nullable=False, primary_key=True, unique=True
    )
    filename = db.Column(db.String(length=100), nullable=False)
    csv_file = db.Column(db.String(length=None), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)


def to_dict(obj):
    fields = {}

    if isinstance(obj.__class__, DeclarativeMeta):
        # an SQLAlchemy class
        for field in [x for x in dir(obj) if not x.startswith("_") and x != "metadata"]:
            data = obj.__getattribute__(field)
            try:
                json.dumps(
                    data
                )  # this will fail on non-encodable values, like other classes
                if data is not None:
                    fields[field] = data
            except TypeError:
                fields[field] = str(data)
    else:
        fields["filename"] = obj[0]
        fields["created_at"] = str(obj[1].replace(microsecond=0))
        fields["file_id"] = obj[2]

    # a json-encodable dict
    return fields
