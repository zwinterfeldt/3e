from flask import Blueprint, jsonify

calendar_routes = Blueprint('calendar_routes', __name__)

@calendar_routes.route('/contact')
def cal_and_email():
    return jsonify({'message': 'Here is where your calendar will go'})