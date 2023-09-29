//// Sandbox Testing ////

function getSelectedOptionsText() {
    const selectedOptions = {
        option0: document.getElementById("selectedOption0").textContent,
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
    console.log('matching',matchingStations);
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
    
// Initialize the map
var map = L.map('map').setView([41.8781, -87.6298], 13);

// Add a base tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const selectedOptions = getSelectedOptionsText();

  
  
  

