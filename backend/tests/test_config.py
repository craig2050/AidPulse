import pytest

from backend.src.core.config import Settings

def test_settings_defaults():
    settings = Settings()
    assert settings.app_name == "FastAPI LLM WebApp"
    assert settings.debug == False
    assert settings.api_v1_prefix == "/api/v1"

def test_settings_override():
    settings = Settings(
        app_name="Test App",
        debug=True,
        api_v1_prefix="/test"
    )
    assert settings.app_name == "Test App"
    assert settings.debug == True
    assert settings.api_v1_prefix == "/test"

def test_model_settings():
    settings = Settings()
    assert settings.model_path is not None
    assert settings.max_tokens > 0
    assert settings.temperature >= 0 and settings.temperature <= 1