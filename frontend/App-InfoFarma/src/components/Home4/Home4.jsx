import React, { useEffect, useState } from 'react';
import './Home4.css';
import { CardMed } from './components/CardMed';

export const Home4 = () => {
  const [products, setProducts] = useState([]);

  const productsData = async () => {
    const response = await fetch('/data/precios_medicamentos.json')
    const jsonData = await response.json()

    const productsArray = Object.values(jsonData)
    const randomProducts = getRandomProducts(productsArray, 6)
    setProducts(randomProducts)
    console.log(randomProducts)
  };

  const getRandomProducts = (productsArray, count = 6) => {
    const flattenedProductsArray = productsArray.length > 0 ? productsArray[0] : [];

    const shuffledProducts = [...flattenedProductsArray];

    for (let i = shuffledProducts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledProducts[i], shuffledProducts[j]] = [shuffledProducts[j], shuffledProducts[i]];
    }

    return shuffledProducts.slice(0, count);
  };


  console.log(getRandomProducts)
  useEffect(() => {
    productsData()
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