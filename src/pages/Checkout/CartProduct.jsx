import dayjs from 'dayjs'
import axios from 'axios'
import DeliveryOption from './DeliveryOption'
import { formatCurrency } from '../../utils/money';
import './CartProduct.css'

export default function CartProduct({ cartItemId, productId, productName, productImage, productPriceCents, quantity, deliveryOptions, deliveryOptionId, loadCart }) {


  const deleteCartProduct = async () => {
    await axios.delete(`/api/cart-items/${productId}`);
    await loadCart();
  }

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
            <span className="delete-quantity-link link-primary" onClick={deleteCartProduct}>
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