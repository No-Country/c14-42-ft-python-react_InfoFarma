import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Footer } from '../Footer/Footer';
import { Navegador } from './Components/Navegador';
import { ProductList } from './Components/ProductList';
import { getAllProducts, filterAlphabetic, orderBy } from '../../redux/actions';
import useLocalStorage from '../../customHooks/useLocalStorage';
import { Filtrador } from './Components/Filtrador'; 
import { Box } from '@mui/material';

export const PageProductos = () => {
  const dispatch = useDispatch();

  const productos = useSelector((state) => state.allProducts);
  const productsFiltered = useSelector((state) => state.productsFiltered);

  const [alfabeto, setAlfabeto] = useState([]);
  const [letraSeleccionada, setLetraSeleccionada] = useLocalStorage('letraSeleccionada', '');
  const [productosFiltrados, setProductosFiltrados] = useState(productos); // Estado para productos filtrados

  const [order, setOrder] = useState(0)

  useEffect(() => {
    dispatch(getAllProducts())
      // .then(() => {
      //   setLoading(false);
      // })
      .catch((error) => {
        console.error('Error al cargar los productos', error);
        // setLoading(false);
      });
  }, [dispatch]);

// Primero guardo las letras y la letra seleccionada en sus estados locales
  useEffect(() => {
    const letras = [...new Set(productos.map((producto) => producto.name[0]))].sort();
    setAlfabeto(letras);
    setLetraSeleccionada(letras[0] || '');
  }, [productos]);

  // Luego cargo los productos filtrados dependiendo si cambia la letra seleccionada (por eso se carga antes al estado la letra seleccionada y las demas letras)
  useEffect(() => {
    if (letraSeleccionada) {
      dispatch(filterAlphabetic(letraSeleccionada))
    }
  }, [letraSeleccionada, dispatch]);

  // Se le pasa al estado order la option definida en el componente Filtrador, allí se modifica el estado según la selección de filtro y luego se hace un dispatch a orderBy y se le pasa el estado mencionado anteriormente 
  useEffect(() => {
      dispatch(orderBy(order))
  }, [order])

  return (
    <Box sx={{
      p: [0, '1rem'],
      bgcolor: '#dcf1dc64'
      // maxWidth: '87vw'
    }}>
      <Box sx={
        {
          pt: '1rem',
          width: '100%',
          display: {md: 'flex'},
          // mt: 5
          // justifyContent: 'space-around'
        }
      }>
        <Navegador className='nav' letras={alfabeto} letraSeleccionada={letraSeleccionada} onChange={setLetraSeleccionada} />
        <Filtrador onFiltrar={setOrder} />
      </Box>
      {productos.length === 0 ? (
        <div>Cargando productos...</div>
      ) : (
        <ProductList productos={productsFiltered} />
      )}
      <Footer />
    </Box>
  )
}


//La siguiente estructura me estaba creando un bucle a la hora de hacer las peticiones a la API:
/*
export const PageProductos = () => {
  const dispatch = useDispatch()
  const productos = useSelector((state) => state.allProducts)
  const [alfabeto, setAlfabeto] = useState([])
  const [letraSeleccionada, setLetraSeleccionada] = useLocalStorage('letraSeleccionada', '');

  useEffect(() => {
    dispatch(getAllProducts());
    const arrayProductos = productos;

    if (!letraSeleccionada) {
      const letras = [...new Set(arrayProductos.map((producto) => producto.name[0]))].sort();
      setAlfabeto(letras);
      setLetraSeleccionada(letras[0] || '');
    } else {
      const letras = [...new Set(arrayProductos.map((producto) => producto.name[0]))].sort();
      setAlfabeto(letras);
    }
  }, [dispatch, productos, setLetraSeleccionada, letraSeleccionada]);

  return (
    <div className='container'>
      <Navegador letras={alfabeto} letraSeleccionada={letraSeleccionada} onChange={setLetraSeleccionada} />
      <ProductList productos={productos} letraSeleccionada={letraSeleccionada} />
      <Footer />
    </div>
  );
};
*/