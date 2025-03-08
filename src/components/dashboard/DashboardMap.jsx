import { useEffect, useRef, useState } from 'react';
import { Box, Alert, CircularProgress } from '@mui/material';
import 'leaflet/dist/leaflet.css';

function IncidentMap({ location }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mapInitialized, setMapInitialized] = useState(false);

  // Babcock University coordinates as fallback
  const defaultLocation = {
    lat: 6.8927,
    lng: 3.7172
  };

  useEffect(() => {
    let isMounted = true;
    let timeoutId = null;

    // Dynamic import to ensure Leaflet only loads in browser environment
    const initializeMap = async () => {
      try {
        // Exit if component unmounted
        if (!isMounted) return;

        // Check if map container exists
        if (!mapContainerRef.current) {
          console.error("Map container ref is null");
          setError("Map container not found");
          setLoading(false);
          return;
        }

        // Validate location
        const validLocation = location && 
          typeof location.lat === 'number' && 
          typeof location.lng === 'number' 
          ? location 
          : defaultLocation;

        // Import Leaflet dynamically
        const L = await import('leaflet');
        
        // Fix Leaflet icon issue
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        });

        // Clean up previous map instance if it exists
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
        }

        // Create new map
        const map = L.map(mapContainerRef.current).setView(
          [validLocation.lat, validLocation.lng], 
          16
        );
        
        // Store map instance for cleanup
        mapInstanceRef.current = map;

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Add campus marker
        L.circle([defaultLocation.lat, defaultLocation.lng], {
          color: '#1976d2',
          fillColor: '#1976d280',
          fillOpacity: 0.2,
          radius: 500,
        }).addTo(map);

        // Add incident marker
        L.marker([validLocation.lat, validLocation.lng])
          .addTo(map)
          .bindPopup("Incident Location")
          .openPopup();

        // Force map to recalculate its size
        if (isMounted) {
          timeoutId = setTimeout(() => {
            if (map && isMounted) {
              map.invalidateSize();
              setMapInitialized(true);
              setLoading(false);
            }
          }, 250);
        }
      } catch (err) {
        console.error("Error initializing map:", err);
        if (isMounted) {
          setError("Failed to load the map: " + err.message);
          setLoading(false);
        }
      }
    };

    // First render the map container, then initialize the map
    if (mapContainerRef.current) {
      // Delay map initialization slightly to ensure DOM is ready
      timeoutId = setTimeout(() => {
        if (isMounted) {
          initializeMap();
        }
      }, 300);
    }

    // Cleanup function
    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [location]);

  if (error) {
    return (
      <Box sx={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '300px', width: '100%', position: 'relative' }}>
      {loading && (
        <Box sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <CircularProgress />
        </Box>
      )}
      <Box 
        ref={mapContainerRef} 
        sx={{ 
          height: '100%', 
          width: '100%', 
          borderRadius: 1,
          // Make the container always visible but the loading indicator shows on top
          // This helps ensure the container exists when Leaflet tries to initialize
        }} 
      />
    </Box>
  );
}

export default IncidentMap;