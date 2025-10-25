import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import axios from 'axios'
import DeliveryOption from './DeliveryOption'
import './CartProduct.css'

export default function CartProduct({ productName, productImage, productPrice, quantity, deliveryOptionId }) {
  const [productDeliveryOptionId, setProductDeliveryOptionId] = useState(deliveryOptionId)
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  useEffect(() => {
    axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
      .then(response => setDeliveryOptions(response.data));
  }, []);

  return (
    <div className="cart-item-container">
      <div className="delivery-date">
        Delivery date: {dayjs(deliveryOptions.find(option => option.id === productDeliveryOptionId)?.estimatedDeliveryTimeMs).format('dddd, MMMM DD')}
      </div>

      <div className="cart-item-details-grid">
        <img className="product-image"
          src={productImage} />

        <div className="cart-item-details">
          <div className="product-name">
            {productName}
          </div>
          <div className="product-price">
            {productPrice}
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
              estimatedDeliveryTimeMs={option.estimatedDeliveryTimeMs}
              price={option.priceCents}
              productDeliveryOptionId={productDeliveryOptionId}
              setProductDeliveryOptionId={setProductDeliveryOptionId}
            />
          )}
        </div>
      </div>
    </div>
  )
}