class Config(object):
    DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = (
        "postgresql+psycopg2://postgres:postgres@192.168.99.100/csv_bank"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
