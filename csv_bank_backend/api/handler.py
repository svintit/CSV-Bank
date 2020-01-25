import csv

from datetime import datetime
from uuid import uuid4

from .models import db


def create_csv_entry(model, filename, csv_file):
    reader = csv.reader(csv_file, delimiter=",")
    text_csv = [row for row in reader]

    new_entry = model(
        id=uuid4(), filename=filename, csv_file=text_csv, created_at=datetime.utcnow()
    )
    db.session.add(new_entry)
    db.session.commit()
    return new_entry
