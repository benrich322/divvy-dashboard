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

// This function helps create a border on the map.
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

  

