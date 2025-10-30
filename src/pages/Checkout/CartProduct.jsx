import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import axios from 'axios'
import DeliveryOption from './DeliveryOption'
import { formatCurrency } from '../../utils/money';
import './CartProduct.css'

export default function CartProduct({ cartItemId, productId, productName, productImage, productPriceCents, quantity, deliveryOptionId, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);

  useEffect(() => {
    const fetchDeliveryOptions = async () => {
      const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
      setDeliveryOptions(response.data);
    }

    fetchDeliveryOptions();
  }, []);

  return (
    <div className="cart-item-container">
      <div className="delivery-date">
        Delivery date: {dayjs(deliveryOptions.find(option => option.id === deliveryOptionId)?.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
      </div>

      <div className="cart-item-details-grid">
        <img className="product-image"
          src={productImage} />

        <div className="cart-item-details">
          <div className="product-name">
            {productName}
          </div>
          <div className="product-price">
            {formatCurrency(productPriceCents)}
          </div>
          <div className="product-quantity">
            <span>
              Quantity: <span className="quantity-label">{quantity}</span>
            </span>
            <span className="update-quantity-link link-primary">
              Update
            </span>
            <span className="delete-quantity-link link-primary">
              Delete
            </span>
          </div>
        </div>

        <div className="delivery-options">
          <div className="delivery-options-title">
            Choose a delivery option:
          </div>
          {deliveryOptions.map(option =>
            <DeliveryOption
              key={option.id}
              id={option.id}
              productId={productId}
              cartItemId={cartItemId}
              estimatedDeliveryTimeMs={option.estimatedDeliveryTimeMs}
              price={option.priceCents}
              deliveryOptionId={deliveryOptionId}
              loadCart={loadCart}
            />
          )}
        </div>
      </div>
    </div>
  )
}