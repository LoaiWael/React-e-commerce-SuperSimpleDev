import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import ProductContainer from './ProductContainer';
import { calculateCartQuantity } from '../../utils/cart';
import { formatCurrency } from '../../utils/money';
import './HomePage.css';

export default function HomePage({ cart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('api/products');
      setProducts(response.data);
    }

    fetchProducts();
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
            price={formatCurrency(product.priceCents)}
            keywords={product.keywords}
          />)}
        </div>
      </div>
    </>
  )
}