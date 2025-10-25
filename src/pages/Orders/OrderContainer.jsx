import { Link } from 'react-router';
import dayjs from 'dayjs'
import { formatCurrency } from '../../utils/money'
import buyAgainIcon from '../../assets/images/icons/buy-again.png';
import './OrderContainer.css';

export default function OrderContainer({ id, orderTimeMs, totalCostCents, products }) {
  return (
    <div className="order-container">

      <div className="order-header">
        <div className="order-header-left-section">
          <div className="order-date">
            <div className="order-header-label">Order Placed:</div>
            <div>{dayjs(orderTimeMs).format('MMMM DD')}</div>
          </div>
          <div className="order-total">
            <div className="order-header-label">Total:</div>
            <div>{formatCurrency(totalCostCents)}</div>
          </div>
        </div>

        <div className="order-header-right-section">
          <div className="order-header-label">Order ID:</div>
          <div>{id}</div>
        </div>
      </div>

      <div className="order-details-grid">
        {products.map(list =>
        (
          <>
            <div className="product-image-container">
              <img src={list.product.image} />
            </div>

            <div className="product-details">
              <div className="product-name">
                {list.product.name}
              </div>
              <div className="product-delivery-date">
                Arriving on: {dayjs(list.estimatedDeliveryTimeMs).format('MMMM DD')}
              </div>
              <div className="product-quantity">
                Quantity: {list.quantity}
              </div>
              <button className="buy-again-button button-primary">
                <img className="buy-again-icon" src={buyAgainIcon} />
                <span className="buy-again-message">Add to Cart</span>
              </button>
            </div>

            <div className="product-actions">
              <Link to="/tracking">
                <button className="track-package-button button-secondary">
                  Track package
                </button>
              </Link>
            </div>
          </>
        )
        )}
      </div>
    </div>
  )
}