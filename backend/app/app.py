from flask import Flask
from routes import routes
from calendar_and_email import calendar_routes
from guest_list.guestlist import guestlist_routes
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "http://localhost:9000"])

# Register the blueprints
app.register_blueprint(calendar_routes)
app.register_blueprint(guestlist_routes)
app.register_blueprint(routes)