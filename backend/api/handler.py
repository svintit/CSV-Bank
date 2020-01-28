import pandas as pd

from datetime import datetime
from io import StringIO
from uuid import uuid4, UUID

from .models import db, CsvFileModel

from typing import Callable


def create_csv_entry(
    model: Callable[[CsvFileModel], CsvFileModel], filename: str, csv_file: str
) -> UUID:
    text_csv = csv_file.stream.read().decode("utf-8")
    file_id = uuid4()

    new_entry: CsvFileModel = model(
        file_id=file_id,
        filename=filename,
        csv_file=text_csv,
        created_at=datetime.utcnow(),
    )
    db.session.add(new_entry)
    db.session.commit()
    csv_file.close()
    return file_id


def fill_in_blank(csv_text: str):
    df: pd.DataFrame = pd.read_csv(StringIO(csv_text), sep=",")

    try:
        df["state"].fillna("BLANK", inplace=True)
    except KeyError:
        pass  # Some CSV's will not have this column

    return df.to_csv(index=False)
