let map;
let allMarkers = [];

// Health facilities data
const healthFacilities = [
  {
    name: "Hamilton General Hospital",
    type: "Emergency Hospital",
    contact: "905-521-2100",
    address: "237 Barton St E, Hamilton, ON L8L 2X2",
    position: { lat: 43.2619, lng: -79.8513 }
  },
  {
    name: "St. Joseph's Healthcare Hamilton",
    type: "Emergency Hospital",
    contact: "905-522-1155",
    address: "50 Charlton Ave E, Hamilton, ON L8N 4A6",
    position: { lat: 43.2496, lng: -79.8656 }
  },
  {
    name: "Hamilton Family Health Team",
    type: "Community Clinic",
    contact: "905-667-4848",
    address: "123 James St N, Hamilton, ON L8R 2K8",
    position: { lat: 43.2605, lng: -79.8671 }
  },
  {
    name: "Downtown Walk-In Clinic",
    type: "Walk-in Clinic",
    contact: "905-528-5555",
    address: "345 King St E, Hamilton, ON L8N 1C1",
    position: { lat: 43.2542, lng: -79.8573 }
  },
  {
    name: "East Hamilton Community Health Centre",
    type: "Community Clinic",
    contact: "905-662-4971",
    address: "438 Hughson St N, Hamilton, ON L8L 4N5",
    position: { lat: 43.2672, lng: -79.8551 }
  },
  {
    name: "Westmount Walk-In Medical Clinic",
    type: "Walk-in Clinic",
    contact: "905-389-5555",
    address: "723 Rymal Rd W, Hamilton, ON L9B 2W2",
    position: { lat: 43.2167, lng: -79.8994 }
  },
  {
    name: "Mental Wellness Centre",
    type: "Mental Health Care",
    contact: "905-555-1212",
    address: "88 Locke St S, Hamilton, ON L8P 4A8",
    position: { lat: 43.2548, lng: -79.8802 }
  },
  {
    name: "McMaster University Medical Centre",
    type: "Emergency Hospital",
    contact: "905-521-2100",
    address: "1200 Main St W, Hamilton, ON L8S 4K1",
    position: { lat: 43.2609, lng: -79.9192 }
  },
  {
    name: "Kenilworth Medical Clinic",
    type: "Walk-in Clinic",
    contact: "905-547-7777",
    address: "123 Kenilworth Ave N, Hamilton, ON L8H 4S2",
    position: { lat: 43.2489, lng: -79.8112 }
  },
  {
    name: "Ancaster Mental Health Centre",
    type: "Mental Health Care",
    contact: "905-648-8888",
    address: "456 Wilson St E, Ancaster, ON L9G 2C3",
    position: { lat: 43.2275, lng: -80.0001 }
  }
];

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

    loadHealthFacilities();
}

// Load markers from healthFacilities array
function loadHealthFacilities() {
  healthFacilities.forEach(facility => {
    const marker = new google.maps.Marker({
      position: facility.position,
      map: map,
      title: facility.name,
      animation: google.maps.Animation.DROP
    });

    marker.category = facility.type.toLowerCase(); // Normalize for filtering

    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div style="padding: 10px; min-width: 200px;">
          <h6 style="margin-bottom: 10px; color: #0d6efd;">${facility.name}</h6>
          <p style="margin-bottom: 5px;"><strong>Type:</strong> ${facility.type}</p>
          <p style="margin-bottom: 5px;"><strong>Contact:</strong> ${facility.contact}</p>
          <p style="margin-bottom: 0;"><strong>Address:</strong> ${facility.address}</p>
        </div>
      `
    });

    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });

    allMarkers.push(marker);
  });
}

  // Expose initMap to global scope
window.initMap = initMap;