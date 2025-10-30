import { Link } from 'react-router';
import dayjs from 'dayjs'
import buyAgainIcon from '../../assets/images/icons/buy-again.png';
import './OrderedProduct.css'

export default function OrderedProduct({ orderId, estimatedDeliveryTimeMs, productDetails, quantity }) {
  return (
    <>
      <div className="product-image-container">
        <img src={productDetails.image} />
      </div>

      <div className="product-details">
        <div className="product-name">
          {productDetails.name}
        </div>
        <div className="product-delivery-date">
          Arriving on: {dayjs(estimatedDeliveryTimeMs).format('MMMM DD')}
        </div>
        <div className="product-quantity">
          Quantity: {quantity}
        </div>
        <button className="buy-again-button button-primary">
          <img className="buy-again-icon" src={buyAgainIcon} />
          <span className="buy-again-message">Add to Cart</span>
        </button>
      </div>

      <div className="product-actions">
        <Link to={`/tracking/${orderId}/${productDetails.id}`}>
          <button className="track-package-button button-secondary">
            Track package
          </button>
        </Link>
      </div>
    </>
  )
}