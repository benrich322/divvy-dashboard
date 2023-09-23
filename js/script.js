// Initialize the map
var map = L.map('map-container').setView([51.505, -0.09], 13); // Replace with your desired coordinates and zoom level

// Add a base tile layer (e.g., OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add a marker to the map (optional)
var marker = L.marker([51.5, -0.09]).addTo(map); // Replace with your desired marker coordinates
marker.bindPopup('Hello, this is a Leaflet marker!').openPopup();
