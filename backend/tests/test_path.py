import pytest
import sys
from pathlib import Path

def test_python_path():
    root_dir = Path(__file__).parent.parent.parent
    assert str(root_dir) in sys.path, "Project root not in Python path"
    
    try:
        from backend.src.models import models
        assert True, "Successfully imported models"
    except ImportError as e:
        pytest.fail(f"Failed to import models: {e}")
        