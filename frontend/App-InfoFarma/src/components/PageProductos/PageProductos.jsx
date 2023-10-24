import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Footer } from '../Footer/Footer';
import { Navegador } from './Components/Navegador';
import { ProductList } from './Components/ProductList';
import { getAllProducts } from '../../redux/actions';
import useLocalStorage from '../../customHooks/useLocalStorage'
import './PageProductos.css';
import { Filtrador } from './Components/Filtrador';


export const PageProductos = () => {

  const dispatch = useDispatch()
  const productos = useSelector((state) => state.allProducts)
  const [alfabeto, setAlfabeto] = useState([])
  const [letraSeleccionada, setLetraSeleccionada] = useLocalStorage('letraSeleccionada', '');

  useEffect(() => {
    dispatch(getAllProducts())
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al cargar los productos', error);
        setLoading(false);
      });
  }, [dispatch])

  const productosFiltrados = productos.filter((producto) =>
    letraSeleccionada ? producto.name.startsWith(letraSeleccionada) : true
  );

  useEffect(() => {
    const letras = [...new Set(productos.map((producto) => producto.name[0]))].sort();

    setAlfabeto(letras);
    setLetraSeleccionada(letras[0] || '');
  }, [productos]);

  return (
    <div className='container'>
      <div className='nav-container'>
        <Navegador letras={alfabeto} letraSeleccionada={letraSeleccionada} onChange={setLetraSeleccionada} />
        <Filtrador />
      </div>
      {productos.length === 0 ? (
        <div>Cargando productos...</div>
      ) : (
        <ProductList productos={productosFiltrados} />
      )}
      <Footer />
    </div>
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