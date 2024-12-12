from flask import Blueprint, jsonify

guestlist_routes = Blueprint('guestlist_routes', __name__)

@guestlist_routes.route('/guestlist')
def guest_list():
    return jsonify({'message': 'Man this is the guestlist!'})