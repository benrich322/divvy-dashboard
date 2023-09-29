//// Sandbox Testing ////

function getSelectedOptionsText() {
    const selectedOptions = {
        option0: document.getElementById("selectedOption0").getAttribute("value"),

        option1: document.getElementById("selectedOption1").textContent,
    };
    return selectedOptions;
}

function findMatchingStations(selectedOptions, jsonData) {
    // Initialize an array to store the matching bike stations
    const matchingStations = [];
    
    // Loop through the JSON data to find matches
    jsonData.forEach(station => {
       
      // Check if the station's properties match the selected options
      if (
        selectedOptions.option0 === 'Ward' &&
        selectedOptions.option1 === station.ward
      ) {
        matchingStations.push(station);
      }
    });
  
    // Return the array of matching bike stations
    return matchingStations;
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

// Function to clear all markers from the map
function clearMarkers(map) {
    map.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        // Check if the layer is a marker
        map.removeLayer(layer); // Remove the marker from the map
      }
    });
  }
    
// Initialize the map
var map = L.map('map').setView([41.8781, -87.6298], 13);

// Add a base tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const selectedOptions = getSelectedOptionsText();

  
  
  

