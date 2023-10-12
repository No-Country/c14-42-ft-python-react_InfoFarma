import React, { useEffect, useState } from 'react'
import './Home4.css'
import { CardMed } from './components/CardMed'

const Home4 = () => {

  const [products, setProducts] = useState([])

  const productsData = async () => {
    const data = await fetch('/data/precios_medicamentos.json')
    const products = await data.json()
    console.log(products)
  }
  productsData()

  //Otra opcion que tengo que probar para obtener la info de forma random:
  /*
  const productsData = async () => {
      const data = await fetch(URL de la API proporcionada );
      const products = await data.json();
      // Obtener 6 productos aleatorios
      const randomProducts = getRandomProducts(products, 6);
      setProducts(randomProducts);
  };

  const getRandomProducts = (productsArray, count) => {
    const shuffledProducts = productsArray.sort(() => Math.random() - 0.5);
    return shuffledProducts.slice(0, count);
  };

  useEffect(() => {
    productsData()
  }, [])*/

  return (
    <>
      <div className='home4-container'>
        <h1>Algunos medicamentos</h1>
        <div className='cards-container'>
          {products.map((product, index) => (
            <CardMed key={index} product={product} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Home4