from flask import Flask
from routes import routes
from flask_cors import CORS
from guest_list.guestlist import guestlist_routes

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
app.register_blueprint(guestlist_routes)
app.register_blueprint(routes)