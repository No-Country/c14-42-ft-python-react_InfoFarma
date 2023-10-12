import React, { useEffect, useState } from 'react';
import './Home4.css';
import { CardMed } from './components/CardMed';

const Home4 = () => {
  const [products, setProducts] = useState([]);

  const productsData = async () => {
    try {
      const response = await fetch('/backend/data/precios_medicamentos.json');
      const jsonData = await response.json();
      
      // Accede a la matriz 'data' en el JSON y toma los primeros 6 elementos.
      const productsData = jsonData.data.slice(0, 6);
      setProducts(productsData);
    } catch (error) {
      console.error(error);
    }
  }
  
  //Otra opcion que tengo que probar para obtener la info de forma random:
  /*
  const productsData = async () => {
    try {
      const response = await fetch(URL de la API proporcionada );
      const productsData = await response.json();
      // Obtener 6 productos aleatorios
      const randomProducts = getRandomProducts(productsData, 6);
      setProducts(randomProducts);
    } catch (error) {
      console.error(error);
    }
  };
  
  const getRandomProducts = (productsArray, count) => {
    const shuffledProducts = productsArray.sort(() => Math.random() - 0.5);
    return shuffledProducts.slice(0, count);
  };*/

  useEffect(() => {
    productsData();
  }, []);

  return (
    <>
      <div className='home4-container'>
        <h1>Algunos medicamentos</h1>
        <div className='cards-container'>
          {products.map((product, index) => (
            <CardMed key={index} product={product} />
          ))}  
          <CardMed />
        </div>  
      </div>  
    </>    
  )
}

export { Home4 };


