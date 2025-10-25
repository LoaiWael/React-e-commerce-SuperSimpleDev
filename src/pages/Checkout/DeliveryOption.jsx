import dayjs from 'dayjs'
import { formatCurrency } from '../../utils/money'
import './DeliveryOption.css'

export default function DeliveryOption({ id, estimatedDeliveryTimeMs, price, productDeliveryOptionId, setProductDeliveryOptionId }) {
  return (
    <div className="delivery-option">
      <input type="radio" checked={productDeliveryOptionId === id}
        className="delivery-option-input"
        name={`delivery-option-${id}`}
        onChange={() => setProductDeliveryOptionId(id)}
      />
      <div>
        <div className="delivery-option-date">
          {dayjs(estimatedDeliveryTimeMs).format('dddd, MMMM DD')}
        </div>
        <div className="delivery-option-price">
          {price === 0 ? 'FREE Shipping' : `${formatCurrency(price)} - Shipping`}
        </div>
      </div>
    </div>
  )
}