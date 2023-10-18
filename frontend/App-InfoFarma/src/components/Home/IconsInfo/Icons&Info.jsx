import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { CssBaseline, Container } from '@mui/material';
import styled from '@emotion/styled';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const PageContainer = styled(Container)`
  padding-top: 5.5em;
  padding-bottom: 5em;
  background-color: #E2FCD4;
  min-height: 100vh;
  min-width: 100vw;
  margin: 0 !important;
  font-family: 'Roboto Condensed';
  color: #2F3D2D;
  display: flex;
  flex-direction: column;
`;

const Title = styled('div')`
    font-size: 1em;
    text-align: center;
    margin: 1rem 0;
    margin-bottom: 1rem;

    @media (min-width: 600px) {
        font-size: 1.2rem;
    }
  
    @media (min-width: 960px) {
        font-size: 1.4rem;
    }
`;

const Text = styled('div')`
  font-size: 1em;
  text-align: center;
  width: 10em;
  
  @media (min-width: 600px) {
      font-size: 1.1em;
    }

  @media (min-width: 900px) {
    font-size: 1.4em;
  }
`;

export default function IconsInfo() {
  return (
    <PageContainer>
      <Title>
        <h1>En InfoFarma vas a encontrar:</h1>
      </Title>
    {/* <h1></h1> */}
      <Grid container spacing={2}>
        {itemData.map((item) => (
          <Grid item key={item.img} xs={6} md={4}>
            <Paper
              css={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 3em;
                box-shadow: none;
                background-color: #E2FCD4;
              `}
            >
              <img
                src={item.img}
                alt={item.description}
                width={130}
              />
              <Text>
                <h4>{item.description}</h4>
              </Text>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
}

const itemData = [
  {
    img: '../img/farmacia.png',
    description: 'Farmacias disponibles',
  },
  {
    img: '/img/medicamentos.png',
    description: 'Todo sobre medicamentos',
  },
  {
    img: '/img/buscar.png',
    description: 'Encuentra información',
  },
  {
    img: '/img/ubicacion.png',
    description: 'Tu farmacia más cercana',
  },
  {
    img: '/img/precio-bajo.png',
    description: 'Mejor precio, mismo producto',
  },
  {
    img: '/img/descuento.png',
    description: 'Ofertas/descuentos',
  },
];
