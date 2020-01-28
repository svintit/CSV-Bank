import pytest
import requests


@pytest.fixture
def get_all_resp(base_url):
    resp = requests.get(base_url + "my-bank")
    return resp


@pytest.fixture
def base_url():
    return "http://localhost:8000/"


@pytest.fixture
def post_file_resp(base_url):
    with open("backend/tests/payloads/example.csv", "rb") as f:
        resp = requests.post(base_url + "upload", files={"csv_file": f})
        return resp
