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


def read_geojson_file(file_path):
    try:
        with open(file_path, "r") as geojson_file:
            geojson_data = json.load(geojson_file)
        return geojson_data
    except Exception as e:
        print(f"Error reading GeoJSON file: {str(e)}")
        return None

# Specify the path to your GeoJSON file
geojson_file_path = "../database_components/location_data/chicago_community_area.geojson"
community_area_boundary_geojson = read_geojson_file(geojson_file_path)


# Define your Flask routes

####################################################
# Flask Routes
####################################################

@app.route("/")
def welcome():
    """List all available API routes."""
    return (
        "Available Routes:<br/>"
        "/api/v1.0/stations<br/>"
        "/api/v1.0/community_area_boundary<br/>"
    )

@app.route("/api/v1.0/stations")
def stations():
    """Return a list of stations from the dataset."""
    station_cursor = station_names.find()
    station_data = list(station_cursor)
    return jsonify(station_data)

@app.route("/api/v1.0/community_area_boundary")
def community_area_boundary():
    """Return the geojson of community_area_boundary."""
    community_area_boundary_geojson
    return jsonify(community_area_boundary_geojson)



if __name__ == "__main__":
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port, debug=True)