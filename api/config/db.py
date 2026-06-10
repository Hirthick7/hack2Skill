import sys
import logging
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from .env import env

logger = logging.getLogger(__name__)

# Global mongo client
mongo_client = None
db = None

def connect_db():
    global mongo_client, db
    try:
        mongo_client = MongoClient(env.MONGODB_URI, serverSelectionTimeoutMS=5000)
        # Check connection
        mongo_client.admin.command('ping')
        
        db_name = env.MONGODB_URI.split('/')[-1].split('?')[0] or 'ecotrack'
        db = mongo_client[db_name]
        
        logger.info(f"MongoDB Connected: {env.MONGODB_URI.split('@')[-1] if '@' in env.MONGODB_URI else 'localhost'}")
    except ConnectionFailure as e:
        logger.error(f"MongoDB Connection Error: {str(e)}")
        sys.exit(1)
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        sys.exit(1)
