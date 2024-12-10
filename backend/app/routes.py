from flask import Blueprint, jsonify

routes = Blueprint('routes', __name__)

@routes.route('/')
def home():
    return jsonify({'message': 'Welcome to 3E, your event planning control center!'})