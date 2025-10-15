let map;
let allMarkers = [];
let directionsService;
let directionsRenderer;

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

  // Remove loading class when map is loaded
  google.maps.event.addListenerOnce(map, 'idle', function() {
    mapElement.classList.remove("loading");
  });

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

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

function selectFilter(category) {
  selectedCategory = category;
  filterMarkers(category);
}

function locateUser() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const userLocation = `${lat},${lng}`;
        document.getElementById("originInput").value = userLocation;

        // Optional: drop a marker
        const marker = new google.maps.Marker({
          position: { lat, lng },
          map: map,
          title: "Your Location",
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#0d6efd",
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: "#ffffff"
          }
        });

        map.panTo({ lat, lng });
      },
      error => {
        alert("Unable to retrieve your location.");
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}




function clearDirections() {
  directionsRenderer.setDirections({ routes: [] });
  document.getElementById("destinationInput").value = "";
}

function useMyLocationForDirections() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const userLocation = `${lat},${lng}`;
        document.getElementById("originInput").value = userLocation;

        // Optional: drop a marker
        const marker = new google.maps.Marker({
          position: { lat, lng },
          map: map,
          title: "Your Location",
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#0d6efd",
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: "#ffffff"
          }
        });

        map.panTo({ lat, lng });
      },
      error => {
        alert("Unable to retrieve your location.");
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}


// Get directions between two points
function getDirections() {
  const origin = document.getElementById("originInput").value;
  const destination = document.getElementById("destinationInput").value;
  const mode = window.selectedTravelMode || 'DRIVING'; // Default to DRIVING if none selected

  const request = {
    origin: origin,
    destination: destination,
    travelMode: google.maps.TravelMode[mode]
  };

  directionsService.route(request, (result, status) => {
    if (status === "OK") {
      directionsRenderer.setDirections(result);
    } else {
      alert("Directions request failed: " + status);
    }
  });
}

// Show all markers
function showAllMarkers() {
  allMarkers.forEach(marker => {
    marker.setVisible(true);
  });
}

function toggleUseMyLocation() {
  const useLocation = document.getElementById("useLocationToggle").checked;
  const originInput = document.getElementById("originInput");

  if (useLocation) {
    originInput.style.display = "none";
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        document.getElementById("originInput").value = `${lat},${lng}`;
      },
      () => {
        alert("Unable to retrieve your location.");
      }
    );
  } else {
    originInput.style.display = "block";
    document.getElementById("originInput").value = "";
  }
}

function selectTravelMode(button) {
  // Remove active class from all buttons
  const buttons = document.querySelectorAll('#travelModeButtons button');
  buttons.forEach(btn => {
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-outline-secondary');
  });
  
  // Add active class to clicked button
  button.classList.remove('btn-outline-secondary');
  button.classList.add('btn-primary');
  
  // Store selected mode for getDirections function
  window.selectedTravelMode = button.getAttribute('data-mode');
}

function initializeTravelMode() {
  // Set default travel mode to DRIVING (first button)
  const drivingButton = document.querySelector('#travelModeButtons button[data-mode="DRIVING"]');
  if (drivingButton) {
    selectTravelMode(drivingButton);
  }
}


  // Expose initMap to global scope
window.initMap = initMap;