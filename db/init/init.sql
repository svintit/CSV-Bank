CREATE TABLE IF NOT EXISTS csv_files (
    id BIGSERIAL NOT NULL,
    filename TEXT NOT NULL,
    csv_file TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL
);

