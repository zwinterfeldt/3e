from flask import Flask, Blueprint, jsonify, request
from flask_cors import CORS

# Going to create this as a separate "app" so it can run on a microservice
calendar_routes = Blueprint('calendar_routes', __name__)

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

# In-memory "database" for events
# Just using a dictionary for simplicity's sake
events = []

# Counter for unique event IDs
event_id_counter = 1

# Fetch all events
@calendar_routes.route('/events', methods=['GET'])
def get_events():
    return jsonify(events)

# Add a new event
@calendar_routes.route('/events', methods=['POST'])
def add_event():
    global event_id_counter
    data = request.json
    new_event = {
        'id': event_id_counter,
        'todo': data.get('todo', 'No Title'),
        'date': data.get('date', '')
    }
    events.append(new_event)
    event_id_counter += 1
    return jsonify(new_event), 201

# Edit an existing event
@calendar_routes.route('/events/<int:event_id>', methods=['PUT'])
def edit_event(event_id):
    print(f"Received PUT request for event_id: {event_id}")
    data = request.json
    print(f"Received data: {data}")
    for event in events:
        if event['id'] == event_id:
            event['todo'] = data.get('todo', event['todo'])
            event['date'] = data.get('date', event['date'])
            return jsonify(event), 200
    return jsonify({'error': 'Event not found'}), 404

# Delete an event
@calendar_routes.route('/events/<int:event_id>', methods=['DELETE'])
def delete_event(event_id):
    global events
    events = [event for event in events if event['id'] != event_id]
    return '', 204

app.register_blueprint(calendar_routes)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)