import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Filtrador } from './Components/Filtrador';
import { Footer } from '../Footer/Footer';
import { Navegador } from './Components/Navegador';
import { LinearProgress, Box } from '@mui/material';

// Lazy Loading de PageProductos
const LazyPageProductos = React.lazy(() => import('./PageProductos'));

function PageProductos() {
  const dispatch = useDispatch();

  const productos = useSelector((state) => state.allProducts);
  const productsFiltered = useSelector((state) => state.productsFiltered);
  
  const [alfabeto, setAlfabeto] = useState([]);
  const [letraSeleccionada, setLetraSeleccionada] = useState(''); // Añadí un valor por defecto

  const [order, setOrder] = useState(0);

  useEffect(() => {
    dispatch(getAllProducts())
      .catch((error) => {
        console.error('Error al cargar los productos', error);
      });
  }, [dispatch]);

  useEffect(() => {
    const letras = [...new Set(productos.map((producto) => producto.name[0]))].sort();
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
      p: [0, '1rem'],
      bgcolor: '#dcf1dc64'
    }}>
      <Box sx={{
        pt: '1rem',
        width: '100%',
        display: { md: 'flex' }
      }}>
        <Navegador className='nav' letras={alfabeto} letraSeleccionada={letraSeleccionada} onChange={setLetraSeleccionada} />
        <Filtrador onFiltrar={setOrder} />
      </Box>
      {productos.length === 0 ? (
        <div className='loading'>
          <span>Cargando productos...</span>
          <LinearProgress color='success' />
        </div>
      ) : (
        <React.Suspense fallback={<div>Loading...</div>}>
          <LazyPageProductos productos={productsFiltered} letraSeleccionada={letraSeleccionada} />
        </React.Suspense>
      )}
      <Footer />
    </Box>
  );
}

export default PageProductos;
