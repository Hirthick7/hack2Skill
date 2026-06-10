from flask import Blueprint, jsonify
from api.services.challenge_service import get_challenges, complete_challenge

challenge_bp = Blueprint('challenges', __name__)

@challenge_bp.route('/', methods=['GET'])
def fetch_challenges():
    try:
        challenges = get_challenges()
        return jsonify({
            'success': True,
            'data': challenges
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@challenge_bp.route('/<string:id>/complete', methods=['POST'])
def complete(id):
    try:
        challenge = complete_challenge(id)
        if not challenge:
            return jsonify({
                'success': False,
                'message': 'Challenge not found'
            }), 404
            
        return jsonify({
            'success': True,
            'data': challenge
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500
