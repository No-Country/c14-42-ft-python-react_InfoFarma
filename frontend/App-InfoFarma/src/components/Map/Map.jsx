import React, { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Button } from '@mui/material'

export const Map = () => {
  const apiKey = 'AIzaSyCwV3RBVfWLMFRGmX-I-wa7x5xH1rwOCXM'; // Reemplaza con tu clave de API de Google Maps
  const searchRadius = 2000; // Radio de búsqueda en metros

  const [selectedPharmacy, setSelectedPharmacy] = useState(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: apiKey,
      version: 'weekly',
      libraries: ['places'],
    });

    loader.load().then(google => {
      // Crear un mapa
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 0, lng: 0 },
        zoom: 15, // Ajusta el nivel de zoom según tus preferencias
      });

      // Obtener la ubicación del usuario
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          // Centrar el mapa en la ubicación del usuario
          map.setCenter(userLocation);

          // Realizar una búsqueda de farmacias cercanas
          const placesService = new google.maps.places.PlacesService(map);
          placesService.nearbySearch({
            location: userLocation,
            radius: searchRadius,
            type: 'pharmacy',
          }, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              // Personalizar marcadores para cada farmacia encontrada
              results.forEach(pharmacy => {
                const marker = new google.maps.Marker({
                  position: pharmacy.geometry.location,
                  map: map,
                  title: pharmacy.name,
                });

                // Agregar un evento de clic al marcador
                marker.addListener('click', () => {
                  setSelectedPharmacy(pharmacy);
                });
              });
            } else {
              console.error('Error al buscar farmacias:', status);
            }
          });

          // Agregar un marcador en la ubicación del usuario
          new google.maps.Marker({
            position: userLocation,
            map: map,
            title: "Tu ubicación",
          });
        }, error => {
          console.error('Error al obtener la ubicación:', error);
        });
      } else {
        console.error('El navegador no admite geolocalización.');
      }
    });
  }, []);

  // Función para abrir la ubicación en Google Maps
  const openInGoogleMaps = (location) => {
    const lat = location.lat();
    const lng = location.lng();
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      {selectedPharmacy && (
        <div>
          <h2>Farmacia Seleccionada</h2>
          <p>Nombre: {selectedPharmacy.name}</p>
          <p>Dirección: {selectedPharmacy.vicinity}</p>
          <Button onClick={() => openInGoogleMaps(selectedPharmacy.geometry.location)} variant="contained" color="primary">Ir a farmacia</Button>
          {/* Agrega más detalles de la farmacia según tus necesidades */}
        </div>
      )}
    </div>
  );
};
