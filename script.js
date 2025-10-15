let map;

// Initialize map
function initMap() {
  // Add loading class
  const mapElement = document.getElementById("map");
  mapElement.classList.add("loading");
  
  map = new google.maps.Map(mapElement, {
    center: { lat: 43.2557, lng: -79.8711 },
    zoom: 13,
    mapId: "95dee93d6b472b95d2ec15b5",
    styles: [
      {
        featureType: "poi.medical",
        elementType: "geometry.fill",
        stylers: [{ color: "#ff6b6b" }]
      }
    ]
  });
}

  // Expose initMap to global scope
window.initMap = initMap;