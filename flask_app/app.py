# Import the dependencies
import os
from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import json

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





# Define your Flask routes

####################################################
# Flask Routes
#####################################################

@app.route("/")
def welcome():
    """List all available API routes."""
    return (
        "Available Routes:<br/>"
        "/api/v1.0/stations<br/>"
        "/api/v1.0/city_boundary<br/>"
        "/api/v1.0/community_area_boundary<br/>"
        "/api/v1.0/neighborhood_boundary<br/>"
        "/api/v1.0/ward_boundary<br/>"
    )

@app.route("/api/v1.0/stations")
def stations():
    """Return a list of stations from the dataset."""
    station_cursor = station_names.find()
    station_data = list(station_cursor)
    return jsonify(station_data)

@app.route("/api/v1.0/city_boundary")
def city_boundary():
    """Return the geojson of city_boundary."""
    base_directory = os.path.dirname(__file__)
    city_geojson_file_path = os.path.join(base_directory, "../database_components/location_data/chicago_city.geojson")
    city_area_boundary_geojson = read_geojson_file(city_geojson_file_path)
    if city_area_boundary_geojson:
        print("GeoJSON Data:")
        print(city_area_boundary_geojson)  # Debug print
        return jsonify(city_area_boundary_geojson)
    else:
        return jsonify({"error": "GeoJSON data is missing or malformed"})

@app.route("/api/v1.0/community_area_boundary")
def community_area_boundary():
    """Return the geojson of community_area_boundary."""
    base_directory = os.path.dirname(__file__)
    geojson_file_path = os.path.join(base_directory, "../database_components/location_data/chicago_community_area.geojson")
    community_area_boundary_geojson = read_geojson_file(geojson_file_path)
    if community_area_boundary_geojson:
        print("GeoJSON Data:")
        print(community_area_boundary_geojson)  # Debug print
        return jsonify(community_area_boundary_geojson)
    else:
        return jsonify({"error": "GeoJSON data is missing or malformed"})

@app.route("/api/v1.0/neighborhood_boundary")
def neighborhood_boundary():
    """Return the geojson of neighborhood_boundary."""
    base_directory = os.path.dirname(__file__)
    neighborhood_geojson_file_path = os.path.join(base_directory, "../database_components/location_data/chicago_neighborhoods.geojson")
    neighborhood_area_boundary_geojson = read_geojson_file(neighborhood_geojson_file_path)
    if neighborhood_area_boundary_geojson:
        print("GeoJSON Data:")
        print(neighborhood_area_boundary_geojson)  # Debug print
        return jsonify(neighborhood_area_boundary_geojson)
    else:
        return jsonify({"error": "GeoJSON data is missing or malformed"})

@app.route("/api/v1.0/ward_boundary")
def ward_boundary():
    """Return the geojson of ward_boundary."""
    base_directory = os.path.dirname(__file__)
    ward_geojson_file_path = os.path.join(base_directory, "../database_components/location_data/chicago_wards.geojson")
    ward_area_boundary_geojson = read_geojson_file(ward_geojson_file_path)
    if ward_area_boundary_geojson:
        print("GeoJSON Data:")
        print(ward_area_boundary_geojson)  # Debug print
        return jsonify(ward_area_boundary_geojson)
    else:
        return jsonify({"error": "GeoJSON data is missing or malformed"})


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port, debug=True)