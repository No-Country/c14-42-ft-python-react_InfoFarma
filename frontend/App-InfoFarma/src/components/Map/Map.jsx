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
  
  },[])

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
                    url: 'https://img.icons8.com/color/48/drugstore.png', // Icono personalizado
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

    // Crear un elemento de textarea invisible para copiar el texto
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    document.body.appendChild(textArea);

    // Seleccionar y copiar el texto
    textArea.select();
    document.execCommand("copy");

    // Eliminar el elemento de textarea
    document.body.removeChild(textArea);

    // Configurar el mensaje de la Snackbar
    setSnackbarMessage("Información copiada al portapapeles");

    // Abrir la Snackbar
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
            Farmacia Seleccionada
          </Typography>
          <Typography variant='h6' component='p' m={1}>
            Dirección: {selectedPharmacy.vicinity}
          </Typography>
          <Typography variant='h6' component='p' m={1}>
            Nombre: {selectedPharmacy.name}
          </Typography>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            maxWidth: '400px',
            margin: '0 auto',
            padding: '10px',
          }}>
            <Button onClick={() => openInGoogleMaps(selectedPharmacy.geometry.location)} variant="contained">
              Ir a Google Maps
            </Button>
            <Button onClick={() => copyToClipboard(selectedPharmacy.name, selectedPharmacy.vicinity)} variant='contained'>
              Copiar Dirección
            </Button>
          </div>
        </div>
      )}
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={2200} // Duración de la Snackbar
        onClose={() => setIsSnackbarOpen(false)} // Función para cerrar la Snackbar
        message={snackbarMessage} // Mensaje de la Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        TransitionComponent={Slide}
        TransitionProps={{ direction: "left" }}
      />

    </div>

  );
};
