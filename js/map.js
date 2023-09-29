//// Sandbox Testing ////

function getSelectedOptionsText() {
    const selectedOptions = {
        option0: document.getElementById("selectedOption0").getAttribute("value"),
        option1: document.getElementById("selectedOption1").textContent,
    };
    return selectedOptions;
}

function findMatchingStationsnew(selectedOptions, jsonData) {
   // selectedOptions.option0 = selectedOptions.option0.toLowerCase();
    // Initialize an array to store the matching bike stations
    const matchingStations = [];
    
    // Loop through the JSON data to find matches
    jsonData.forEach(station => {
        // Check if the station has a property that exactly matches selectedOptions.option0
        if (station[selectedOptions.option0] === selectedOptions.option1) {
          matchingStations.push(station);
        }
    });  
    // Return the array of matching bike stations
    return matchingStations;
}

// Function to create map markers for an array of coordinates
function createMarkers(coordinatesArray, map) {
    coordinatesArray.forEach(coordinate => {
      const { lat, lng, station_name, ride_count } = coordinate;
  
      // Create a marker for the current coordinate
      const marker = L.marker([lat, lng]).addTo(map);
      // Add a popup with station information
      marker.bindPopup(
        `<b>${station_name}</b><br>Ride Count: ${ride_count}`
      );
    });
}

// Function to clear all markers and borders from the map
function clearMarkersAndBorders(map) {
    map.eachLayer(layer => {
        if (layer instanceof L.Marker || layer instanceof L.GeoJSON) {
            // Check if the layer is a marker or GeoJSON layer
            map.removeLayer(layer); // Remove the marker or GeoJSON layer from the map
        }
    });
}

// Function to display community area border
function displayCommunityAreaBorder(selectedOptions, leafletMap) {
    // Parse the selected options to get the community area name
    var communityAreaName = selectedOptions.option1;
    communityAreaName = communityAreaName.toUpperCase();

    // Ensure that the GeoJSON data is loaded
    if (!geojsonData) {
        // If not loaded, fetch the data first
        fetchGeoJSONData().then(function() {
            displayBorderWithGeoJSON(communityAreaName, leafletMap);
        });
    } else {
        // If already loaded, display the border using the stored data
        displayBorderWithGeoJSON(communityAreaName, leafletMap);
    }
}

// Function to display border using GeoJSON data with custom styling
function displayBorderWithGeoJSON(communityAreaName, leafletMap) {
    // Find the GeoJSON feature corresponding to the selected community area
    var selectedFeature = null;

    geojsonData.features.forEach(function(feature) {
        if (feature.properties.community === communityAreaName) {
            selectedFeature = feature;
        }
    });

    if (selectedFeature) {
        // Define custom styling options
        var customStyle = {
            color: 'blue',       // Border color
            weight: 2,          // Border weight
            fillColor: 'lightblue',  // Fill color
            fillOpacity: 0.5    // Fill opacity
        };

        // Create a GeoJSON layer with custom styling
        var geojsonLayer = L.geoJSON(selectedFeature, {
            style: customStyle
        });

        // Add the GeoJSON layer to the map
        geojsonLayer.addTo(leafletMap);

        // Fit the map to the bounds of the GeoJSON layer
        leafletMap.fitBounds(geojsonLayer.getBounds());
    } else {
        console.log("Community area '" + communityAreaName + "' not found in GeoJSON data.");
    }
}
    
// Initialize the map
var map = L.map('map').setView([41.8781, -87.6298], 13);

// Add a base tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const selectedOptions = getSelectedOptionsText();

  
  
  

