import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export function IconsInfo() {
  return (
    <div css={css`
    background-color:#E2FCD4;
    margin: 0 !important;
  `}>
      <Grid container spacing={2}>
        {itemData.map((item) => (
          <Grid item key={item.img} xs={6} md={4}>
            <Paper
              css={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 16px;
                box-shadow: none;
                background-color:#E2FCD4;

              `}
            >
              <img
                src={item.img}
                alt={item.description}
                css={css`
                  max-width: 100%;
                `}
              />
              <Typography variant="h5" align="center">
                {item.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

const itemData = [
  {
    img: 'img/farmacia.png',
    description: 'Farmacias disponibles',
  },
  {
    img: 'img/medicamentos.png',
    description: 'Todo sobre medicamentos',
  },
  {
    img: 'img/buscar.png',
    description: 'Encuentra información',
  },
  {
    img: 'img/ubicacion.png',
    description: 'Tu farmacia más cercana',
  },
  {
    img: 'img/precio-bajo.png',
    description: 'Mejor precio, mismo producto',
  },
  {
    img: 'img/descuento.png',
    description: 'Ofertas/descuentos',
  },
];
