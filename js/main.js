// This is the main function that gets executed when the page loads.
function main() {
    // Get the selected options from the dropdowns.
    const selectedOptions = getSelectedOptionsText();

    // Populate the dynamic selection list based on the selected options.
    populateDynamicList();

    // Define the number of collapsibles to handle (in this case, 3).
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

        //
        updateTitle();

    } catch (error) {
        // Handle any errors that occur during the process.
        console.error("Error handling selection change:", error);
    }
}


// Initialize the map with a specific view.
const map = L.map('map').setView([41.8781, -87.6298], 13);

// Add a base tile layer to the map for displaying maps.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


