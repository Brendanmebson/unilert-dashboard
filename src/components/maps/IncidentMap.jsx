// src/components/maps/IncidentMap.jsx
import React, { useEffect, useRef } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

function IncidentMap({ location }) {
  const mapRef = useRef(null);
  
  // Default location (Babcock University)
  const defaultLocation = {
    lat: 6.8927,
    lng: 3.7172
  };

  useEffect(() => {
    // Skip if no map container
    if (!mapRef.current) return;

    // Use valid location or fallback
    const validLocation = (location && 
      typeof location.lat === 'number' && 
      typeof location.lng === 'number') 
      ? location 
      : defaultLocation;

    // Load Leaflet only on client-side
    const loadMap = async () => {
      try {
        // Dynamic import
        const L = await import('leaflet');
        await import('leaflet/dist/leaflet.css');

        // Fix icon issues
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        });

        // Clear existing map
        if (mapRef.current._leaflet) {
          mapRef.current._leaflet.remove();
        }

        // Create map
        const map = L.map(mapRef.current, {
          center: [validLocation.lat, validLocation.lng],
          zoom: 15,
          attributionControl: false
        });
        
        // Store map instance for cleanup
        mapRef.current._leaflet = map;

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Add marker
        L.marker([validLocation.lat, validLocation.lng]).addTo(map);

        // Add circle for campus
        L.circle([defaultLocation.lat, defaultLocation.lng], {
          radius: 500,
          color: '#1976d2',
          fillColor: '#1976d280',
          fillOpacity: 0.2
        }).addTo(map);

        // Force resize after a delay
        setTimeout(() => {
          map.invalidateSize();
        }, 100);
      } catch (error) {
        console.error('Error loading map:', error);
      }
    };

    // Delay map initialization
    const timer = setTimeout(() => {
      loadMap();
    }, 500);

    return () => {
      clearTimeout(timer);
      // Cleanup
      if (mapRef.current && mapRef.current._leaflet) {
        mapRef.current._leaflet.remove();
        mapRef.current._leaflet = null;
      }
    };
  }, [location]);

  return (
    <Box sx={{ position: 'relative', height: '100%', minHeight: 300 }}>
      {/* Static map fallback */}
      <Box 
        sx={{ 
          height: '100%', 
          width: '100%', 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#f0f0f0',
          position: 'absolute'
        }}
      >
        <CircularProgress size={24} />
        <Typography variant="body2" sx={{ ml: 1 }}>Loading map...</Typography>
      </Box>
      
      {/* Actual map container */}
      <Box 
        ref={mapRef} 
        sx={{ 
          height: '100%', 
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0
        }} 
      />
    </Box>
  );
}

export default IncidentMap;