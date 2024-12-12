from flask import Flask
from routes import routes
<<<<<<< HEAD
=======
from calendar_and_email import calendar_routes
>>>>>>> 43c907ec3ed475800f7b8d0fe629aacbf9adb0b1
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
<<<<<<< HEAD
=======

# Register the blueprints
app.register_blueprint(calendar_routes)
>>>>>>> 43c907ec3ed475800f7b8d0fe629aacbf9adb0b1
app.register_blueprint(routes)