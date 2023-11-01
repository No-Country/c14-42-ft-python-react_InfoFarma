import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Filtrador } from './Components/Filtrador';
import { Footer } from '../Footer/Footer';
import { Navegador } from './Components/Navegador';
import { ProductList } from './Components/ProductList';
import { getAllProducts, filterAlphabetic, orderBy } from '../../middlewares/redux/actions';
import useLocalStorage from '../../hooks/customHooks/useLocalStorage';
import { LinearProgress, Box, Typography } from '@mui/material';

import { normalizeName } from '../../hooks/normalizeName';
import Suggestion from './Components/Suggestion';

function PageProductos() {
  const dispatch = useDispatch();

  const productos = useSelector((state) => state.allProducts);
  const productsFiltered = useSelector((state) => state.productsFiltered);

  const [alfabeto, setAlfabeto] = useState([]);
  const [letraSeleccionada, setLetraSeleccionada] = useLocalStorage('letraSeleccionada', '');

  const [order, setOrder] = useState(0);

  useEffect(() => {
    dispatch(getAllProducts())
      .catch((error) => {
        console.error('Error al cargar los productos', error);
      });
  }, [dispatch]);

  useEffect(() => {
    const letras = [...new Set(productos.map((producto) => normalizeName(producto.name)[0]))].sort();
    setAlfabeto(letras);
    setLetraSeleccionada(letras[0] || '');
  }, [productos]);

  useEffect(() => {
    if (letraSeleccionada) {
      dispatch(filterAlphabetic(letraSeleccionada));
    }
  }, [letraSeleccionada, dispatch]);

  useEffect(() => {
    dispatch(orderBy(order));
  }, [order]);

  return (
    <Box sx={{
      pt: '5rem',
      bgcolor: '#dcf1dc64',
    }}>
      <Box sx={{
        pt: '1rem',
        width: '100%',
        display: { md: 'flex' },
      }}>
        <Navegador className='nav' letras={alfabeto} letraSeleccionada={letraSeleccionada} onChange={setLetraSeleccionada} />
        <Filtrador onFiltrar={setOrder} />
      </Box>
      {productos.length === 0 ? (
        <Box mb={4}>
          <Box sx={{
            display: 'flex',
            ml: 2,
            mt: 4,
            mb: 1,
          }}>
            <Typography variant='h6' >Cargando productos...</Typography>
          </Box>
          <LinearProgress color='success' />
        </Box>
      ) : (
        <ProductList productos={productsFiltered} />
      )}
      <Suggestion/>
      <Footer className="footer-container" sx={{ height: '1100px' }}>
        {/* Contenido del footer */}
      </Footer>
    </Box>
  );
}

export default PageProductos;
