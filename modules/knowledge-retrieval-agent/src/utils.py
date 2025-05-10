import os

def ensure_directory_exists(directory):
    """Ensure a directory exists, creating it if necessary."""
    if not os.path.exists(directory):
        os.makedirs(directory)

def load_api_key_from_env():
    """Load API keys from the .env file."""
    from dotenv import load_dotenv
    load_dotenv()
    return os.getenv("GEMINI_API_KEY")
