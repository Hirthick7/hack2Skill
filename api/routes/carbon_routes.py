from flask import Blueprint, request, jsonify
from api.services.carbon_service import calculate_carbon

carbon_bp = Blueprint('carbon', __name__)

@carbon_bp.route('/calculate', methods=['POST'])
def calculate():
    try:
        data = request.get_json()
        result = calculate_carbon(data)
        return jsonify({
            'success': True,
            'data': result
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 400
