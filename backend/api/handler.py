import io

from datetime import datetime
from uuid import uuid4

from .models import db


def create_csv_entry(model, filename, csv_file):
    text_csv = csv_file.stream.read().decode("utf-8")
    file_id = uuid4()

    new_entry = model(
        file_id=file_id, filename=filename, csv_file=text_csv, created_at=datetime.utcnow()
    )
    db.session.add(new_entry)
    db.session.commit()
    csv_file.close()
    return file_id
