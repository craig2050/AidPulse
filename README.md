# FireAI

This project is a single-page web application that utilizes FastAPI to connect to a central server and incorporates a local LLM (Language Model) implemented in WebAssembly (WASM). The application is structured to facilitate test-driven development and provides organization for packaging the WebAssembly.

## Project Structure

- **backend/**: Contains the FastAPI backend code.
  - **src/**: Source code for the backend.
    - **api/**: API endpoints and routing.
    - **core/**: Core configuration and settings.
    - **models/**: Data models for request and response validation.
    - **main.py**: Entry point for the FastAPI application.
  - **tests/**: Unit tests for the backend.
  - **requirements.txt**: Backend dependencies.

- **frontend/**: Contains the frontend application code.
  - **src/**: Source code for the frontend.
    - **components/**: React components for the frontend.
    - **services/**: API service functions.
    - **main.py**: Entry point for the frontend application.
  - **tests/**: Unit tests for the frontend.
  - **requirements.txt**: Frontend dependencies.

- **llm/**: Contains the local LLM implementation.
  - **src/**: Source code for the LLM.
    - **model/**: Model architecture and inference methods.
    - **wasm/**: WebAssembly bindings for the LLM.
  - **tests/**: Unit tests for the LLM.
  - **requirements.txt**: LLM dependencies.

## Installation

To install the required dependencies, navigate to each directory (backend, frontend, llm) and run:

```
pip install -r requirements.txt
```

## Usage

To run the backend server, navigate to the `backend/src` directory and execute:

```
uvicorn main:app --reload
```

To run the frontend application, navigate to the `frontend/src` directory and execute your preferred method (e.g., using a tool like React Scripts).

## Testing

To run the tests for the backend, frontend, and LLM, use pytest in their respective test directories.

## License

This project is licensed under the MIT License.