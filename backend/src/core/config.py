from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "FireAI"
    debug: bool = False
    api_v1_prefix: str = "/api/v1"
    model_path: str = "models/default"
    max_tokens: int = 100
    temperature: float = 0.7