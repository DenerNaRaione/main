from src.main import hello

def test_hello():
    assert hello("codex").startswith("hello")
