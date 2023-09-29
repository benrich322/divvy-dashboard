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
function displayCommunityAreaBorder(selectedOptions, leafletMap) {
    // It looks at a name.
    let communityAreaName = selectedOptions.option1;
    // It makes the name uppercase.
    communityAreaName = communityAreaName.toUpperCase();
    if (!geojsonData) {
        // If we don't have GeoJSON data yet
        fetchGeoJSONData().then(function() {
            // It asks for the map and shows the border on the map.
            displayBorderWithGeoJSON(communityAreaName, leafletMap);
        });
    } else {
        // If we already have the map,
        displayBorderWithGeoJSON(communityAreaName, leafletMap);
    }
}

// This function helps display the border on the map.
function displayBorderWithGeoJSON(communityAreaName, leafletMap) {
    // declaring a variable and setting to null
    let selectedFeature = null;

    // It checks each part of the map Geojson data to find the one that matches the name.
    geojsonData.features.forEach(function(feature) {
        if (feature.properties.community === communityAreaName) {
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
        console.log("Community area '" + communityAreaName + "' not found in GeoJSON data.");
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


