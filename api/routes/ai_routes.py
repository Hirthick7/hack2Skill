from flask import Blueprint, request, jsonify
from api.services.ai_service import generate_ai_response

ai_bp = Blueprint('ai', __name__)

@ai_bp.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        message = data.get('message', '')
        context = data.get('context', None)
        
        if not message:
            return jsonify({
                'success': False,
                'message': 'Message is required'
            }), 400
            
        response_text = generate_ai_response(message, context)
        
        return jsonify({
            'success': True,
            'data': response_text
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500
