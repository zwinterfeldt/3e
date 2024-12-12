from flask import Blueprint, jsonify, render_template

calendar_routes = Blueprint('calendar_routes', __name__)


events = [
    {
        'todo': "Finish proj",
        'date': "2024-12-11",
    },
    {
        'todo': "Finish second proj",
        'date': "2024-12-12",
    }
]

# @calendar_routes.route('/contact')
# def cal_and_email():
#     return jsonify({'message': 'Here is where your calendar will go'})

@calendar_routes.route('/contact')
def calendar():
    return jsonify(events)