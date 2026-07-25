from datetime import datetime
from models import db

class AuditHistory(db.Model):
    __tablename__ = 'audit_history'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    url = db.Column(db.String(512), nullable=False)
    status = db.Column(db.Integer, nullable=True)
    response_time = db.Column(db.Integer, nullable=True) # in ms
    title = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url,
            'status': self.status,
            'response_time': self.response_time,
            'title': self.title,
            'created_at': self.created_at.isoformat()
        }
