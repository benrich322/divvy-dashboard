// Initialize the map
var map = L.map('map').setView([41.8781, -87.6298], 13); // Replace with your desired coordinates and zoom level

// Add a base tile layer (e.g., OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add a marker to the map (optional)
var marker = L.marker([41.8781, -87.6298]).addTo(map); // Replace with your desired marker coordinates
marker.bindPopup('Hello, this is a Leaflet marker!').openPopup();
