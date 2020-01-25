# Makefile for csv-bank webapp

# TARGETS
.PHONY: test
test:
	docker-compose run --rm ci

# LOCAL TESTING
# =======================================================
.PHONY: run
all: build run

build:
	pipenv lock --requirements > csv_bank_backend/requirements.txt
	docker-compose build

run:
	docker-compose up

# DEVELOPMENT
# =======================================================
.PHONY: style
style:
	pipenv run black .
