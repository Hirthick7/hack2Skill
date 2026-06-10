import os
from dotenv import load_dotenv

load_dotenv()

class EnvConfig:
    PORT = int(os.getenv('PORT', 5000))
    NODE_ENV = os.getenv('NODE_ENV', 'development')
    MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/ecotrack')
    GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', '')

env = EnvConfig()
