// This code helps connect to the heroku website that includes all the data

// Created some empty boxes to store the information
let jsonData = null; // Box for general information
let geojsonData = null; // Box for map information

// This is a way to ask the computer to "Please do this, but only if there isn't information yet."
// This function fetches the bike stations data
async function fetchStationData() {
  // If we don't have general information yet, we go to the internet and ask for it.
  if (!jsonData) {
    // Use a magic internet wand (fetch) to connent to the URL with the bike stations data.
    const response = await fetch('https://divvy-db-public-5f412972abe3.herokuapp.com/api/v1.0/stations');

    // Put the data into the general information box (jsonData).
    jsonData = await response.json();

    // Next, look at all the pieces of information (stations) in our box.
    jsonData.forEach(station => {
      if (station.city) { // If there's a word called 'city' in the information,
        station.city = capitalizeWord(station.city); // capaitalize the word to make it look nice.
      }

      if (station.community_area) { // If there's a word called 'community_area' in the information,
        station.community_area = capitalizeWord(station.community_area); // capaitalize the word to make it look nice.
      }
    });
  }
}

// This function fetches the GeoJSON data for the community areas
function fetchGeoJSONData() {
    // Define the URL with the GeoJSON data for the community areas
    const geojsonUrl = "https://divvy-db-public-5f412972abe3.herokuapp.com/api/v1.0/community_area_boundary";

    // Use the magic internet wand (fetch) the GeoJSON data for the community areas
    return fetch(geojsonUrl)
      .then(function(response) {
          return response.json(); // Find the map data and put it in the map box (geojsonData).
      })
      .then(function(data) {
          geojsonData = data;
      })
      .catch(function(error) {
          // If something goes wrong and can't find the map, tell the computer there's an error.
          console.error("Error fetching GeoJSON data: " + error);
    });
}
