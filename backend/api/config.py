class Config(object):
    DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = (
        "postgresql+psycopg2://postgres:postgres@127.0.0.1:5431/csv_bank"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
