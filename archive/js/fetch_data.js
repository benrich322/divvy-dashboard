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
    console.log('jsonData',jsonData)
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
// This function fetches the GeoJSON data for the community areas
// Define an object to store cached GeoJSON data


// Define URLs for all location types
const geojsonUrls = {
    city: "https://divvy-db-public-5f412972abe3.herokuapp.com/api/v1.0/city_boundary",
    community_area: "https://divvy-db-public-5f412972abe3.herokuapp.com/api/v1.0/community_area_boundary",
    neighborhood: "https://divvy-db-public-5f412972abe3.herokuapp.com/api/v1.0/neighborhood_boundary",
    ward: "https://divvy-db-public-5f412972abe3.herokuapp.com/api/v1.0/ward_boundary"
};

// Function to fetch and cache all GeoJSON data
function fetchAndCacheGeoJSONData() {
    const promises = Object.keys(geojsonUrls).map((locationType) => {
        const geojsonUrl = geojsonUrls[locationType];
        return fetch(geojsonUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                geojsonDataCache[locationType] = data; // Cache the fetched data
            });
    });

    return Promise.all(promises);
}

// Function to fetch GeoJSON data for a specific location_type_selection
function fetchGeoJSONData(location_type_selection) {
    return new Promise((resolve, reject) => {
        // Check if GeoJSON data is already cached
        const cachedData = geojsonDataCache[location_type_selection];
        if (cachedData) {
            resolve(cachedData); // Resolve with the cached data
        } else {
            reject(new Error("GeoJSON data not found for location_type_selection: " + location_type_selection));
        }
    });
}








