from flask import Blueprint, request, jsonify
from services.auditor import perform_audit
from models.audit import AuditHistory
from models import db

api_bp = Blueprint('api', __name__)

@api_bp.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "alive", "message": "Server is running!"}), 200

@api_bp.route('/audit', methods=['POST'])
def audit():
    data = request.get_json()
    if not data or 'url' not in data:
        return jsonify({"error": "Invalid JSON or missing 'url'."}), 400
        
    url = data['url']
    
    try:
        audit_result = perform_audit(url)
        audit_result['url'] = url
        
        # Save to DB
        record = AuditHistory(
            url=url,
            status=audit_result.get('status'),
            response_time=audit_result.get('response_time'),
            title=audit_result.get('title')
        )
        db.session.add(record)
        db.session.commit()
        
        return jsonify(audit_result), 200
        
    except ValueError as e:
        err_msg = str(e)
        status_code = 500
        if err_msg in ["Invalid URL. Make sure it includes http:// or https://", "Non HTML Content", "Invalid URL"]:
            status_code = 400
        return jsonify({"error": err_msg}), status_code

@api_bp.route('/history', methods=['GET'])
def history():
    records = AuditHistory.query.order_by(AuditHistory.created_at.desc()).limit(50).all()
    return jsonify([r.to_dict() for r in records]), 200
