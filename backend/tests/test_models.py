from pydantic import ValidationError
import pytest
from backend.src.models.models import ChatRequest, ChatResponse, LLMConfig

def test_chat_request_validation():
    # Test valid chat request
    valid_request = ChatRequest(message="Hello", user_id="user123")
    assert valid_request.message == "Hello"
    assert valid_request.user_id == "user123"
    
    # Test invalid chat request
    with pytest.raises(ValidationError):
        ChatRequest(message="", user_id="user123")  # Empty message
        
def test_chat_response_validation():
    # Test valid chat response
    valid_response = ChatResponse(
        message="Hello back!",
        request_id="req123",
        model_version="1.0"
    )
    assert valid_response.message == "Hello back!"
    assert valid_response.request_id == "req123"
    
def test_llm_config_validation():
    # Test valid LLM configuration
    valid_config = LLMConfig(
        model_path="/models/llm",
        max_tokens=100,
        temperature=0.7
    )
    assert valid_config.max_tokens == 100
    assert 0 <= valid_config.temperature <= 1