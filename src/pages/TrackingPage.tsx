import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import axios from 'axios';
import dayjs from 'dayjs';
import Header from '../components/Header'
import type { cartItem, order, selectedProduct } from '../types';
import './TrackingPage.css'

export default function TrackingPage({ cart }: { cart: cartItem[] }) {
  const [orderedProduct, setOrderedProduct] = useState<selectedProduct | null>(null);
  const [deliveryState, setDeliveryState] = useState<number>(1);
  const { orderId, orderedProductId } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await axios.get(`/api/orders/${orderId}?expand=products`);
      const rightOrder: order = response.data;

      const rightProduct = rightOrder.products?.find((product) => product.productId === orderedProductId);

      if (rightProduct) {
        setOrderedProduct(rightProduct);
        if (rightProduct.estimatedDeliveryTimeMs) {
          const totalDeliveryTimeMs = rightProduct.estimatedDeliveryTimeMs - rightOrder.orderTimeMs;
          const timePassed = dayjs().valueOf() - rightOrder.orderTimeMs;

          if (totalDeliveryTimeMs <= 0) {
            setDeliveryState(100);
          } else {
            const progress = (timePassed / totalDeliveryTimeMs) * 100;
            setDeliveryState(Math.min(progress, 100));
          }
        } else {
          setDeliveryState(1);
        }
      }
    }
    fetchOrder();
  }, [orderId, orderedProductId]);

  const isPreparing = deliveryState < 33;
  const isShipped = deliveryState >= 33 && deliveryState < 100;
  const isDelivered = deliveryState === 100;

  return (
    <>
      <title>Tracking | E-commerce</title>
      <link rel="icon" href="/favicons/tracking-favicon.png" />

      <Header cart={cart} />

      {orderedProduct && (
        <div className="tracking-page">
          <div className="order-tracking">
            <Link className="back-to-orders-link link-primary" to="/orders">
              View all orders
            </Link>

            <div className="delivery-date">
              {deliveryState === 100 ? 'Delivered on' : 'Arriving on'} {dayjs(orderedProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
            </div>

            <div className="product-info">
              {orderedProduct.product?.name}
            </div>

            <div className="product-info">
              Quantity: {orderedProduct.quantity}
            </div>

            <img className="product-image" src={`../../public/${orderedProduct.product.image}`} alt={orderedProduct.product.name} />

            <div className="progress-labels-container">
              <div className={`progress-label ${isPreparing && 'current-status'}`}>
                Preparing
              </div>
              <div className={`progress-label ${isShipped && 'current-status'}`}>
                Shipped
              </div>
              <div className={`progress-label ${isDelivered && 'current-status'}`}>
                Delivered
              </div>
            </div>

            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${deliveryState}%` }}></div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}