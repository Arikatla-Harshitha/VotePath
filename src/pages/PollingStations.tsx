import React, { useEffect, useRef, useState } from 'react';
import { Card } from '../components/Card';
import { Loader } from '../components/Loader';
import { loadGoogleMaps } from '../services/maps';
import './PollingStations.css';

const PollingStations: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    let map: google.maps.Map;

    const initMap = async () => {
      try {
        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
        if (!apiKey || apiKey === 'your_google_maps_api_key_here') {
          // Use basic iframe fallback if no API key is provided
          setUseFallback(true);
          setIsLoading(false);
          return;
        }

        await loadGoogleMaps(apiKey);

        if (mapRef.current) {
          map = new google.maps.Map(mapRef.current, {
            center: { lat: 20.0, lng: 0.0 }, // Center on the Atlantic to view the world
            zoom: 2, // Zoom out to see the world
            styles: [
              { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
              { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
              { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
            ],
          });

          // Major polling locations across the world
          const stations = [
            { lat: 38.9072, lng: -77.0369, title: "Washington D.C., USA" },
            { lat: 51.5074, lng: -0.1278, title: "London, UK" },
            { lat: -33.8688, lng: 151.2093, title: "Sydney, Australia" },
            { lat: 35.6762, lng: 139.6503, title: "Tokyo, Japan" },
            { lat: 28.6139, lng: 77.2090, title: "New Delhi, India" },
            { lat: -23.5505, lng: -46.6333, title: "São Paulo, Brazil" },
            { lat: 48.8566, lng: 2.3522, title: "Paris, France" },
            { lat: -26.2041, lng: 28.0473, title: "Johannesburg, South Africa" }
          ];

          stations.forEach(station => {
            new google.maps.Marker({
              position: { lat: station.lat, lng: station.lng },
              map,
              title: station.title,
              icon: {
                url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
              }
            });
          });
        }
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to load map", err);
        setUseFallback(true);
        setIsLoading(false);
      }
    };

    initMap();
  }, []);

  return (
    <div className="polling-container">
      <h1 className="text-center mb-4">Find Polling Stations</h1>
      <p className="text-center mb-8 subtitle">Locate official voting centers near you.</p>

      <Card className="map-card">
        {isLoading && <Loader />}
        {useFallback && !isLoading && (
          <iframe
            className="google-map"
            title="Basic Google Maps Fallback"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src="https://maps.google.com/maps?q=polling+stations+near+me&t=&z=13&ie=UTF8&iwloc=&output=embed"
          ></iframe>
        )}
        {!useFallback && !isLoading && (
          <div ref={mapRef} className="google-map" aria-label="Interactive map showing polling stations"></div>
        )}
      </Card>
    </div>
  );
};

export default PollingStations;
