from pydantic import BaseModel, Field, validator

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1)
    user_id: str = Field(..., min_length=1)

    @validator('message')
    def message_must_not_be_empty(cls, v):
        if not v.strip():
            raise ValueError('Message cannot be empty')
        return v.strip()

class ChatResponse(BaseModel):
    message: str
    request_id: str
    model_version: str

class LLMConfig(BaseModel):
    model_path: str
    max_tokens: int = Field(default=100, gt=0)
    temperature: float = Field(default=0.7, ge=0.0, le=1.0)