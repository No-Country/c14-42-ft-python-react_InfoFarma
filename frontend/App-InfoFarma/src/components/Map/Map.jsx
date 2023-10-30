import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = () => {
  // Configura las coordenadas del centro del mapa (por defecto, inicia en una ubicación)
  const defaultCenter = { lat: 19.4326068, lng: -99.1357798 };

  // Configura el radio de búsqueda (en metros)
  const searchRadius = 1500;

  // Clave de API de Google
  const apiKey = 'AIzaSyBedIuI_wGuP6pbEysub4bash7L3Aa0zds';

  // Estados para almacenar los marcadores de las farmacias
  const [pharmacies, setPharmacies] = useState([]);

  // Función para obtener farmacias cercanas
  const getNearbyPharmacies = (position) => {
    const { lat, lng } = position;

    // Realiza una solicitud a la API de Places
    fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${searchRadius}&type=pharmacy&key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        // Actualiza el estado con los datos de las farmacias cercanas
        setPharmacies(data.results);
      })
      .catch((error) => {
        console.error('Error al obtener farmacias cercanas:', error);
      });
  };

  // Obtén la ubicación del usuario cuando se monta el componente
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // Obtiene la ubicación del usuario y llama a la función para obtener farmacias cercanas
        const userPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        getNearbyPharmacies(userPosition);
      });
    }
  }, []);

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={defaultCenter}
        zoom={8}
      >
        {/* Renderiza marcadores para las farmacias */}
        {pharmacies.map((pharmacy) => (
          <Marker
            key={pharmacy.place_id}
            position={{
              lat: pharmacy.geometry.location.lat,
              lng: pharmacy.geometry.location.lng,
            }}
            // Puedes personalizar los marcadores aquí
            // icon={{ url: 'ruta/de/imagen.png', scaledSize: { width: 30, height: 30 } }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
