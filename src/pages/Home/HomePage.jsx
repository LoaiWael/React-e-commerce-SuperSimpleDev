import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import ProductContainer from './ProductContainer';
import './HomePage.css';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('api/products').then(response => {
      setProducts(response.data);
    });

    axios.get('api/cart-items').then(response => {
      setCart(response.data);
    })
  }, []);

  return (
    <>
      <title>Home | E-commerce</title>
      <link rel="icon" href="favicons/home-favicon.png" />

      <Header cartQuantity={calculateCartQuantity(cart)} />

      <div className="home-page">
        <div className="products-grid">
          {products.map(product => <ProductContainer
            key={product.id}
            image={product.image}
            name={product.name}
            rating={product.rating}
            price={(product.priceCents / 100).toFixed(2)}
            keywords={product.keywords}
          />)}
        </div>
      </div>
    </>
  )
}

function calculateCartQuantity(cart) {
  let counter = 0;
  cart.forEach(cartItem => {
    counter += cartItem.quantity;
  });
  return counter;
}