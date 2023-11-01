import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { CssBaseline, Container } from '@mui/material';
import styled from '@emotion/styled';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const Img = styled("img")({
  width: 130,
  height: "100%",
  objectFit: "contain",
});

export default function IconsInfo() {
  return (
    <Container
    maxWidth="100vw"
    sx={{
        bgcolor: '#E2FCD4',
        p: 5,
        textAlign: 'center',
        placeItems: 'center'
      }}>
        <Typography 
        variant='h4' 
        component='h2'
        color='primary'
        p={5}
        pt={7}
        >
          En InfoFarma vas a encontrar:</Typography >
      <Grid container spacing={5} pb={10} >
        {itemData.map((item) => (
          <Grid 
            item 
            key={item.img}
            xs={12} 
            sm={6}
            md={4} 
            pb={7}
          >
              <Img
                pb={5}
                justifyContent='center'
                src={item.img}
                alt={item.description}
              />
              <Typography color='primary' justifyContent='center' variant='h5' component='h4' fontSize='1.4rem'>{item.description}</Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

const itemData = [
  {
    img: '../img/farmacia.png',
    description: 'Farmacias disponibles',
  },
  {
    img: '/img/medicamentos.png',
    description: 'Información de cada medicamento',
  },
  {
    img: '/img/terceraedad.png',
    description: 'Funcionalidades y estilos agradables y simples para los de tercera edad',
  },
  {
    img: '/img/precio-bajo.png',
    description: 'Mejor precio, mismo producto',
  },
  {
    img: '/img/buscar.png',
    description: 'Podrás recibir noticias y promociones al suscribirte',
  },
  {
    img: '/img/ubicacion.png',
    description: 'Tu farmacia más cercana',
  },
];
  