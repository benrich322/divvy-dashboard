//////// Initialize the Leaflet map instance ////////
const map = L.map('map').setView([41.8781, -87.6298], 13);

// Add a base tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    // Attribution for the map source
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Explanation:
// 1. Initialize a Leaflet map instance and set it to 'map' variable.
//    - This map will be placed inside the HTML element with id 'map'.
//    - The initial view will be centered at latitude 41.8781 and longitude -87.6298 (Chicago) with a zoom level of 13.

// 2. Add a base tile layer to the map.
//    - The tile layer is retrieved from OpenStreetMap using the specified URL template.
//    - {s}, {z}, {x}, and {y} are placeholders replaced by Leaflet with appropriate values.
//      - {s}: Subdomain (for load balancing).
//      - {z}: Zoom level.
//      - {x}: Tile's horizontal coordinate.
//      - {y}: Tile's vertical coordinate.
//    - Attribution information is provided for OpenStreetMap's usage.
//    - The tile layer is added to the 'map' instance, making it the base layer of the map.

//////// FUnctions to Fetch Data ////////

// This code helps connect to the Heroku website that includes all the data

// Initialize jsonData as an empty array
let jsonData = null;

// Initialize geojsonData as null
let geojsonData = null;
let geojsonUrl = null;

// This function fetches the bike stations data
async function fetchStationData() {
  // If we don't have general information yet, we go to the internet and ask for it.
  if (!jsonData) {
    // Use a magic internet wand (fetch) to connect to the URL with the bike stations data.
    const response = await fetch('https://divvy-db-public-5f412972abe3.herokuapp.com/api/v1.0/stations');

    // Put the data into the general information box (jsonData).
    jsonData = await response.json();
    // Next, look at all the pieces of information (stations) in our box.
    jsonData.forEach(station => {
      if (station.city) { // If there's a word called 'city' in the information,
        station.city = capitalizeWord(station.city); // capitalize the word
      }

      if (station.community_area) { // If there's a word called 'community_area' in the information,
        station.community_area = capitalizeWord(station.community_area); // capitalize the word
      }
    });
  }
}

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

//////// Functions for Page Loading and Dropdown Selection Changes ////////

// This is the main function that gets executed when the page loads.
function main() {
    // Get the selected options from the dropdowns.
    const selectedOptions = getSelectedOptionsText();

    // Populate the dynamic selection list based on the selected options.
    populateDynamicList();

    // Define the number of collapsibles to handle
    const numCollapsibles = 2;

    // Loop through the collapsibles and set up their behavior.
    for (let index = 0; index < numCollapsibles; index++) {
        handleCollapsibleSelection(index);
    }
    handleSelectionChange(map);
}

// Call the main function when the page loads.
window.onload = main;

// This function handles changes in the selected options.
async function handleSelectionChange(map) {
    try {
        // Clear any existing markers and borders on the map.
        clearMarkersAndBorders(map);

        // Fetch station data from the internet and wait for it to complete.
        await fetchStationData();

        // Get the selected options from the dropdowns.
        const selectedOptions = getSelectedOptionsText();
       
        // Find stations that match the selected options.
        const matchingStations = findMatchingStationsnew(selectedOptions, jsonData);

        // Create markers on the map for the matching stations.
        createMarkers(matchingStations, map);

        // Display the community area border on the map.
        displayCommunityAreaBorder(selectedOptions, map);

        // Update the map header to match the selections.
        updateTitle();
    } catch (error) {
        // Handle any errors that occur during the process.
        console.error("Error handling selection change:", error);
    }
}

fetchAndCacheGeoJSONData().then(() => {
  // This block of code will run after the GeoJSON data has been fetched and cached
  // Your application is now ready to use cached GeoJSON data
  // You can access it using geojsonDataCache[location_type_selection]
});

//////// Functions for Map Dropdown Selections /////////
  
// This function helps create the dropdown user flow
function handleCollapsibleSelection(index) {
  // It's like, "When someone clicks on the dropdown, do some things."

  // Finds the dropdown selections in index.html to click on, and it's giving it a name.
  const collapsibleClick = document.querySelectorAll('.collapsible__selection')[index];
  const collapsible = document.querySelectorAll('.collapsible')[index];
  const selectedOption = document.getElementById(`selectedOption${index}`);

  // When someone clicks on the dropdown, it's like, "Hey, computer, listen!"
  collapsibleClick.addEventListener('click', function () {

    // It closes other dropdown boxes that are open.
    const allCollapsibles = document.querySelectorAll('.collapsible');
    allCollapsibles.forEach((element, i) => {
      if (i !== index) {
        element.classList.remove('collapsible--expanded');
      }
    });

    // Then, it opens and closes the box clicked on.
    collapsible.classList.toggle('collapsible--expanded');

    // If the box is open, it does even more things.

    if (collapsible.classList.contains('collapsible--expanded')) {
      // It's like, "When clicking on things inside the open box, do these things."

      const collapsibleListItems = collapsible.querySelectorAll('.collapsible__list');
      collapsibleListItems.forEach((item) => {
        item.addEventListener('click', function (event) {
          // When you click on something inside the box, it changes the dropdown selection.

          selectedOption.textContent = event.target.textContent;

          // It also asks for help from another function to do more tasks.
          handleSelectionChange(map);

          // Adding a new value attribute to the index.html
          selectedOption.setAttribute('value', event.target.getAttribute('value'));
          // It closes the box you clicked on by removing the collapsible--expanded class.
          collapsible.classList.remove('collapsible--expanded');
        });
      });

      // It's finding the selections for the location type and location dropdowns.
      const loction_type_selection = document.getElementById('selectedOption0');
      const selectedOption1 = document.getElementById('selectedOption1');

      // It tells the computer to look for changes in the words.
      const observer = new MutationObserver(function (mutationsList) {
        for (let mutation of mutationsList) {
          if (mutation.type === 'childList' && mutation.target === loction_type_selection) {
            // When the words change, it does some more things and uses another function to complete a task.
            selectedOption1.textContent = '';
            populateDynamicList();
          }
        }
      });

      // It tells the computer what kind of changes to look for.
      const observerConfig = { childList: true };

      // It's like saying, "Hey computer, watch these words for me."
      observer.observe(loction_type_selection, observerConfig);
    }
  });
}

// This function helps populate the dropdown list on the web page.
async function populateDynamicList() {
    try {
      // It fetches the station data from the internet if don't have it yet.
      await fetchStationData();
      
      // It finds the value attribute of the selected option of the location type dropdown
      const selectedOptionValue = document.getElementById('selectedOption0').getAttribute('value');

      // It makes a list of unique selections and puts them on the web page.
      const uniqueValues = [...new Set(jsonData.map(item => item[selectedOptionValue]))];
      uniqueValues.sort((a, b) => {
        // Check if both 'a' and 'b' are numbers
        if (!isNaN(a) && !isNaN(b)) {
          return a - b; // Sort numbers in ascending order
        }
      
        // Sort strings in alphabetical order
        return String(a).localeCompare(String(b));
      });
      
      console.log(uniqueValues);
      // It finds the place in index.html to place the list
      const dynamicSelectionList = document.querySelector('.dynamic_selection');
      
      // It clears any old things from the list.
      dynamicSelectionList.innerHTML = '';
      
      // It puts the unique things in the list.
      uniqueValues.forEach(value => {
        const listItem = document.createElement('li');
        listItem.textContent = value;
        listItem.classList.add('collapsible__list');
        dynamicSelectionList.appendChild(listItem);
      });
      
    } catch (error) {
      // If something goes wrong, it tells the computer there's a problem.
      console.error('Error populating dynamic list:', error);
    }
}

// This function finds the selections of location type and location
function getSelectedOptionsText() {
    // It creates a box to hold the choices.
    const selectedOptions = {
        // Inside the box, there are two things to know:

        // 1. Find the value attribute of the locatoin type selection in index.html
        option0: document.getElementById("selectedOption0").getAttribute("value"),

        // 2. Find the selection of the location dropdown
        option1: document.getElementById("selectedOption1").textContent,
    };

    // After looking at these things, we put the choices in our box.
    return selectedOptions;
}

// This function helps find things that match the location type and locatoin selections.
function findMatchingStationsnew(selectedOptions, jsonData) {
    // It has a list to collect things that match the choices.
    const matchingStations = [];
    // It looks at each thing in a big list of information.
    jsonData.forEach(station => {

        // If a the location type and locaton match with the jsondata,
        if (station[selectedOptions.option0] === selectedOptions.option1) {
          // add that thing to our list.
          matchingStations.push(station);
        }
    });  

    // After looking at all the things, give the list to the computer.
    return matchingStations;
}

//////// Functions for Leaflet Map ////////

// This function helps create the markers on a map
function createMarkers(coordinatesArray, map) {
    // It looks at each set of coordinates in a list.
    coordinatesArray.forEach(coordinate => {
      // It takes the information about that place.
      const { lat, lng, station_name, ride_count } = coordinate;
      // It puts a marker on that place on the map.
      const marker = L.marker([lat, lng]).addTo(map);
      // It writes the ride count on the marker popup.
      marker.bindPopup(
        `<b>${station_name}</b><br>Ride Count: ${ride_count}`
      );
    });
}

let geojsonDataCache = {}; // Cache for storing fetched GeoJSON data

// This function helps create a border on the map.
function displayCommunityAreaBorder(selectedOptions, leafletMap) {
    // It looks at a name.
    let location_type_selection = selectedOptions.option0;
    let location_selection = selectedOptions.option1;

    // It makes the name uppercase.
    if (location_type_selection === 'community_area' || location_type_selection === 'city') {
        // If location_type_selection is 'community_area', convert the name to uppercase
        location_selection = location_selection.toUpperCase();
    }

    // Check if GeoJSON data is already cached
    if (!geojsonDataCache[location_type_selection]) {
        // If not cached, fetch and cache the GeoJSON data
        fetchGeoJSONData(location_type_selection)
            .then(function (geojsonData) {
                // After fetching, display the border on the map
                displayBorderWithGeoJSON(location_type_selection, location_selection, leafletMap, geojsonData);
            })
            .catch(function (error) {
                // Handle any errors here
                console.error("Error fetching GeoJSON data: " + error);
            });
    } else {
        // If already cached, display the border using cached data
        displayBorderWithGeoJSON(location_type_selection, location_selection, leafletMap, geojsonDataCache[location_type_selection]);
    }
}

// This function displays the border on the map.
function displayBorderWithGeoJSON(location_type_selection, location_selection, leafletMap, geojsonData) {
    // Check if geojsonData is null or undefined
    if (!geojsonData) {
        console.error("GeoJSON data is null or undefined.");
        return;
    }

    // declaring a variable and setting to null
    let selectedFeature = null;

    // Iterate through the features in geojsonData to find a match
    geojsonData.features.forEach(function (feature) {
        if (
            (location_type_selection === 'community_area' && feature.properties.community === location_selection) ||
            (location_type_selection === 'neighborhood' && feature.properties.pri_neigh === location_selection) ||
            (location_type_selection === 'city' && feature.properties.name === location_selection) ||
            (location_type_selection === 'ward' && feature.properties.ward === location_selection)
            // Add more conditions as needed
        ) {
            selectedFeature = feature;
        }
    });

    // If it finds the match,
    if (selectedFeature) {
        // It draws a blue border around it.
        const customStyle = {
            color: 'blue',       // Border color
            weight: 2,          // Border weight
            fillColor: 'lightblue',  // Fill color
            fillOpacity: 0.5    // Fill opacity
        };
        const geojsonLayer = L.geoJSON(selectedFeature, {
            style: customStyle
        });
        geojsonLayer.addTo(leafletMap);

        // It makes the map move to the center of the border
        leafletMap.fitBounds(geojsonLayer.getBounds());
    } else {
        // If it can't find a match, it says there's a problem.
        console.log("Community area '" + location_selection + "' not found in GeoJSON data.");
    }
}

// This function clears markers and boarders on the map.
function clearMarkersAndBorders(map) {
    // It goes through everything on the map.
    map.eachLayer(layer => {
        // If it's a marker or a line (border),
        if (layer instanceof L.Marker || layer instanceof L.GeoJSON) {
            // It removes it from the map.
            map.removeLayer(layer);
        }
    });
}

//////// Misc Utility Functions ////////

// This function capitalizes a word
function capitalizeWord(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

// This function updates the title of a map element based on the content of the dropdowns
function updateTitle() {
    // Get the text content of selectedOption0 and selectedOption1
    const selectedOption0 = document.getElementById("selectedOption0").textContent;
    const selectedOption1 = document.getElementById("selectedOption1").textContent;

    // Check if selectedOption1 is blank
    if (selectedOption1.trim() === "") {
        // If it's blank, show a message to make a selection
        const titleElement = document.querySelector(".map__title");
        let newTitle = `Divvy Station Map ${selectedOption0}: Select a Location`;
        titleElement.textContent = newTitle;
    } else {
        // Combine the text content to form the new title
        let newTitle = `Divvy Station Map ${selectedOption0}: ${selectedOption1}`;

        // Update the title element with the new title
        const titleElement = document.querySelector(".map__title");
        titleElement.textContent = newTitle;
    }
}
  