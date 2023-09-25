# Import the dependencies
import os
from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient

# Create a Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for the entire app

# Connect to MongoDB using the MONGODB_URI environment variable
mongo_uri = os.environ.get('MONGODB_URI')
mongo = MongoClient(mongo_uri)

# Use the desired database and collection
db = mongo.get_default_database()
station_names = db['station_names']

# Define your Flask routes

##################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available API routes."""
    return (
        "Available Routes:<br/>"
        "/api/v1.0/stations<br/>"
    )

@app.route("/api/v1.0/stations")
def stations():
    """Return a list of stations from the dataset."""
    station_cursor = station_names.find()
    station_data = list(station_cursor)
    return jsonify(station_data)

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port, debug=True)