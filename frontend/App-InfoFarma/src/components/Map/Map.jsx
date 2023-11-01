import React, { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Button, Typography, Slide } from '@mui/material'
import { Snackbar } from '@mui/material'


export const Map = () => {
  const apiKey = 'AIzaSyCwV3RBVfWLMFRGmX-I-wa7x5xH1rwOCXM';
  const searchRadius = 2000; // Radio de búsqueda en metros

  const [pharmacies, setPharmacies] = useState([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);


  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const response = await fetch('https://info-farma-backend.onrender.com/farmacias');
        if (response.ok) {
          const data = await response.json();
          setPharmacies(data);
        } else {
          console.error('Error al cargar los datos del backend');
        }
      } catch (error) {
        console.error('Error al cargar los datos del backend:', error);
      }
    };

    fetchPharmacies();

  }, [])

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
        zoom: 14.4, // Ajusta el nivel de zoom
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
          const keyword = pharmacies.map(pharmacy => pharmacy.name.replace(/\s/g, '')).join('|');
          const placesService = new google.maps.places.PlacesService(map);
          placesService.nearbySearch({
            keyword: keyword,
            location: userLocation,
            radius: searchRadius,
          }, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              results.forEach(pharmacy => {
                const marker = new google.maps.Marker({
                  position: pharmacy.geometry.location,
                  map: map,
                  title: pharmacy.name,
                  icon: {
                    url: 'https://img.icons8.com/color/48/drugstore.png',
                    scaledSize: new google.maps.Size(40, 40),
                  }
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
            icon: {
              url: 'https://img.icons8.com/tiny-color/48/user.png',
              scaledSize: new google.maps.Size(30, 30),
            }
          });
        }, error => {
          console.error('Error al obtener la ubicación:', error);
        });
      } else {
        console.error('El navegador no admite geolocalización.');
      }
    });
  }, [pharmacies]);

  // Función para abrir la ubicación en Google Maps
  const openInGoogleMaps = (location) => {
    console.log('Abriendo Google Maps: ', location)
    const lat = location.lat();
    const lng = location.lng();
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

  const [snackbarMessage, setSnackbarMessage] = useState("");
  //Función para copiar los datos en papelera
  const copyToClipboard = (name, vicinity) => {
    const textToCopy = `Nombre: ${name}\nDirección: ${vicinity}`;

    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    document.body.appendChild(textArea);

    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    setSnackbarMessage("Información copiada al portapapeles");
    setIsSnackbarOpen(true);
  };


  return (
    <div>
      <div id="map" style={{
        width: '100%',
        height: '400px',
        maxWidth: '900px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        margin: '2rem auto',
      }}></div>
      {selectedPharmacy && (
        <div style={{
          textAlign: 'center',
          padding: '1rem',
        }}>
          <Typography variant='h4' component='p' m={2}>
            {selectedPharmacy.name}
          </Typography>
          <Typography variant='h6' component='p' m={1}>
            Dirección: {selectedPharmacy.vicinity}
          </Typography>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            maxWidth: '400px',
            margin: '0 auto',
            padding: '10px',
          }}>
            <Button style={{
              borderRadius: 4,
              backgroundColor: "#366a19",
              marginTop: 1,
              paddingRight: 3,
              paddingLeft: 3,
              fontSize: 14
            }} onClick={() => openInGoogleMaps(selectedPharmacy.geometry.location)} variant="contained">
              Ir a Google Maps
            </Button>
            <Button style={{
              borderRadius: 4,
              backgroundColor: "#366a19",
              marginTop: 1,
              paddingRight: 3,
              paddingLeft: 3,
              fontSize: 14
            }} onClick={() => copyToClipboard(selectedPharmacy.name, selectedPharmacy.vicinity)} variant='contained'>
              Copiar Dirección
            </Button>
          </div>
        </div>
      )}
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={2200}
        onClose={() => setIsSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        TransitionComponent={Slide}
        TransitionProps={{ direction: "left" }}
      />

    </div>

  );
};
