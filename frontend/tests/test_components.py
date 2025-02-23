fastapi-llm-webapp
├── backend
│   ├── src
│   │   ├── api
│   │   │   ├── __init__.py
│   │   │   ├── endpoints.py
│   │   │   └── routes.py
│   │   ├── core
│   │   │   ├── __init__.py
│   │   │   └── config.py
│   │   ├── models
│   │   │   ├── __init__.py
│   │   │   └── models.py
│   │   └── main.py
│   ├── tests
│   │   ├── __init__.py
│   │   ├── conftest.py
│   │   └── test_api.py
│   └── requirements.txt
├── frontend
│   ├── src
│   │   ├── components
│   │   │   └── LlmChat.py
│   │   ├── services
│   │   │   └── api.py
│   │   └── main.py
│   ├── tests
│   │   └── test_components.py
│   └── requirements.txt
├── llm
│   ├── src
│   │   ├── model
│   │   │   └── model.py
│   │   └── wasm
│   │       └── bindings.py
│   ├── tests
│   │   └── test_model.py
│   └── requirements.txt
├── pyproject.toml
└── README.md