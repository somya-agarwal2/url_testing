import os
from flask import Flask
from flask_cors import CORS
from models import db
from routes.api import api_bp

def create_app(test_config=None):
    app = Flask(__name__)
    CORS(app)
    
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

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)
