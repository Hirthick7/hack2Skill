from flask import Flask, render_template
from flask_cors import CORS
from api.config.env import env
from api.config.db import connect_db
from api.routes.carbon_routes import carbon_bp
from api.routes.ai_routes import ai_bp
from api.routes.challenge_routes import challenge_bp

import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Register Blueprints
app.register_blueprint(carbon_bp, url_prefix='/api/carbon')
app.register_blueprint(ai_bp, url_prefix='/api/ai')
app.register_blueprint(challenge_bp, url_prefix='/api/challenges')

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    if env.NODE_ENV != 'test':
        # Connect to DB (though currently not strictly required by our services)
        try:
            connect_db()
        except Exception as e:
            logger.warning("Could not connect to MongoDB. App will continue without DB.")
            
    logger.info(f"Starting server on port {env.PORT}...")
    app.run(host='0.0.0.0', port=env.PORT, debug=True)
