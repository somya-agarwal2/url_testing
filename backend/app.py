import os
from flask import Flask
from flask_cors import CORS
from models import db
from routes.api import api_bp
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def create_app(test_config=None):
    app = Flask(__name__)
    
    # Configure dynamic CORS
    frontend_url = os.environ.get('FRONTEND_URL', 'http://localhost:5173')
    CORS(app, origins=[frontend_url, "http://localhost:5173", "http://127.0.0.1:5173"])
    
    # Configure Database
    if test_config:
        app.config.from_mapping(test_config)
    else:
        db_path = os.path.join(app.instance_path, 'pagepulse.db')
        os.makedirs(app.instance_path, exist_ok=True)
        app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{db_path}"
    
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Initialize DB
    db.init_app(app)
    
    # Register Blueprints
    app.register_blueprint(api_bp)
    
    with app.app_context():
        db.create_all()
        
    return app

# Expose global application instance for Gunicorn
app = create_app()

if __name__ == '__main__':
    # Render assigns a dynamic port via the PORT environment variable
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
