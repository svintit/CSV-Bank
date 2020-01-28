import requests


def test_get_all_success(get_all_resp):
    assert get_all_resp.status_code == 200


def test_get_one_success(get_all_resp, base_url):
    rjson = get_all_resp.json()
    file_id = rjson[0]["file_id"]
    resp = requests.get(base_url + f"my-bank/{file_id}")
    assert resp.status_code == 200


def test_get_not_existent_fail(base_url):
    resp = requests.get(base_url + "my-bank/345345")
    assert resp.status_code != 200


def test_post_success(post_file_resp):
    assert post_file_resp.status_code == 200


def test_post_no_file(base_url):
    resp = requests.post(base_url + "upload")
    assert resp.status_code != 200
