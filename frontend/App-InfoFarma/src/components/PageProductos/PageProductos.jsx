import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, Typography, Grid } from '@mui/material';
import { Item } from '../Home/HeroSection/Item';
import data from '../../../public/data/precios_medicamentos.json';
import './PageProductos.css';
import { Footer } from '../Footer/Footer';

export const PageProductos = () => {
  const [productos, setProductos] = useState([]);
  const [letraSeleccionada, setLetraSeleccionada] = useState('');

  useEffect(() => {
    const arrayProductos = data.data ? data.data : data;
    const productosOrdenados = arrayProductos.sort((a, b) =>
      a.medicamento.localeCompare(b.medicamento)
    );
    setProductos(productosOrdenados);
  }, []);

  const productosFiltrados = productos.filter((producto) =>
    letraSeleccionada ? producto.medicamento.startsWith(letraSeleccionada) : true
  );

  const alfabeto = [...new Set(productos.map((producto) => producto.medicamento[0]))].sort();

  return (
    <div className='page-productos'>
      <Stepper className='stepper-alfabeto'>
        {alfabeto.map((letra) => (
          <Step key={letra} onClick={() => setLetraSeleccionada(letra)}>
            <StepLabel>
              <Typography>{letra}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container spacing={3} className='grid-productos'>
        {productosFiltrados.map((producto) => (
          <Item key={producto.id} product={producto} />
        ))}
      </Grid>
      <Footer />
    </div>
  );
};
