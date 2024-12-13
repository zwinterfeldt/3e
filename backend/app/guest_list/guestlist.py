'''from flask import Blueprint, jsonify

guestlist_routes = Blueprint('guestlist_routes', __name__)

@guestlist_routes.route('/guestlist')
def guest_list():
    return jsonify({"guests": ["Alice", "Bob", "Charlie"]})
    '''
    
import sqlite3
from flask import Blueprint, request, jsonify

guestlist_routes = Blueprint("guestlist_routes", __name__)

# Database setup
def init_db():
    conn = sqlite3.connect("guestlist.db")
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS guests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL
        )
    """)
    conn.commit()
    conn.close()

init_db()

# Get all guests
@guestlist_routes.route("/guestlist", methods=["GET"])
def get_guestlist():
    conn = sqlite3.connect("guestlist.db")
    c = conn.cursor()
    c.execute("SELECT name FROM guests")
    guests = [row[0] for row in c.fetchall()]
    conn.close()
    return jsonify({"guests": guests})

# Add a guest
@guestlist_routes.route("/guestlist", methods=["POST"])
def add_guest():
    new_guest = request.json.get("name")
    if not new_guest:
        return jsonify({"message": "Name is required"}), 400

    try:
        conn = sqlite3.connect("guestlist.db")
        c = conn.cursor()
        c.execute("INSERT INTO guests (name) VALUES (?)", (new_guest,))
        conn.commit()
        conn.close()
        return jsonify({"message": f"{new_guest} added"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"message": "Guest already exists"}), 400

# Remove a guest
@guestlist_routes.route("/guestlist/<name>", methods=["DELETE"])
def remove_guest(name):
    conn = sqlite3.connect("guestlist.db")
    c = conn.cursor()
    c.execute("DELETE FROM guests WHERE name = ?", (name,))
    conn.commit()
    rows_deleted = c.rowcount
    conn.close()

    if rows_deleted > 0:
        return jsonify({"message": f"{name} removed"}), 200
    return jsonify({"message": f"{name} not found"}), 404

# Modify a guest
@guestlist_routes.route("/guestlist/<old_name>", methods=["PUT"])
def modify_guest(old_name):
    new_name = request.json.get("name")
    if not new_name:
        return jsonify({"message": "New name is required"}), 400

    conn = sqlite3.connect("guestlist.db")
    c = conn.cursor()
    c.execute("UPDATE guests SET name = ? WHERE name = ?", (new_name, old_name))
    conn.commit()
    rows_updated = c.rowcount
    conn.close()

    if rows_updated > 0:
        return jsonify({"message": f"{old_name} updated to {new_name}"}), 200
    return jsonify({"message": f"{old_name} not found"}), 404
