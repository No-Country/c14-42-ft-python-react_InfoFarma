import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Filtrador } from './Components/Filtrador';
import { Navegador } from './Components/Navegador';
import { Footer } from '../Footer/Footer';
import { ItemList } from '../Home/HeroSection/ItemList';
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

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

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

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
        <Navegador letras={alfabeto} letraSeleccionada={letraSeleccionada} onChange={setLetraSeleccionada} />
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
          </Box>
          <Box mb={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
            <Typography variant='h6' sx={{ textAlign: 'center', mb: 2 }}>
              Cargando productos...
            </Typography>
          </Box>
          <LinearProgress color='success' />

        </Box>
      ) : (
        <>
          <ItemList searchTerm={letraSeleccionada} filteredData={productsFiltered} currentPage={currentPage} itemsPerPage={itemsPerPage} handleChangePage={handleChangePage} />
        </>
      )}
      <Suggestion />
      <Footer className="footer-container" sx={{ height: '1100px' }}>
        {/* Contenido del footer */}
      </Footer>
    </Box>
  );
}

export default PageProductos;
