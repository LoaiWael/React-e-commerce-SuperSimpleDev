import { useState, useEffect } from 'react';
import axios from 'axios'
import { calculateCartQuantity } from '../../utils/cart';
import OrderContainer from './OrderContainer';
import Header from '../../components/Header';
import './OrdersPage.css';

export default function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get('/api/orders?expand=products')
      .then(response => setOrders(response.data));
  }, [])

  return (
    <>
      <title>Orders | E-commerce</title>
      <link rel="icon" href="favicons/orders-favicon.png" />

      <Header cartQuantity={calculateCartQuantity(cart)} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map(order =>
          (<OrderContainer
            key={order.id}
            id={order.id}
            orderTimeMs={order.orderTimeMs}
            totalCostCents={order.totalCostCents}
            products={order.products}
          />))}
        </div>
      </div>
    </>
  )
}