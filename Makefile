# Makefile for csv-bank webapp

# LOCAL TESTING
# =======================================================
.PHONY: run
all: build run

build:
	pipenv lock --requirements > backend/requirements.txt
	docker-compose build

run:
	docker-compose up

test:
	@echo "\n--> Please make sure containers are running <--\n"
	pytest backend/tests

# DEVELOPMENT
# =======================================================
.PHONY: style
style:
	pipenv run black .

# API DOCS VALIDATE AND CONVERT
# =======================================================
.PHONY: openapi
openapi:
	make openapi_validator && make openapi_converter

.PHONY: openapi_validator
openapi_validator:
	@echo "\nCOMMAND:"
	python -c 'from openapi_spec_validator import validate_spec_url; validate_spec_url("file:backend/apidocs/private.yaml")'
	@echo "\n--- VALIDATED ---"

.PHONY: openapi_converter
openapi_converter:
	@echo "\nCOMMAND:"
	python -c "import sys, yaml, json; json.dump(yaml.load(sys.stdin, yaml.SafeLoader), sys.stdout, indent=4)" < backend/apidocs/private.yaml >| backend/apidocs/private.json
	@echo "\n--- CONVERTED ---"
