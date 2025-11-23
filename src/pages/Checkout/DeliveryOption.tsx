import dayjs from 'dayjs'
import axios from 'axios'
import { formatCurrency } from '../../utils/money'
import './DeliveryOption.css'

export interface deliveryOptionsCard {
  id: number,
  cartItemId: number,
  productId: string,
  estimatedDeliveryTimeMs: number,
  price: number,
  deliveryOptionId: number,
  loadCart: CallableFunction
}

export default function DeliveryOption({ id, cartItemId, productId, estimatedDeliveryTimeMs, price, deliveryOptionId, loadCart }: deliveryOptionsCard) {
  const updateDeliveryOption = async () => {
    await axios.put(`/api/cart-items/${productId}`, {
      deliveryOptionId: id
    });
    await loadCart();
  }

  return (
    <div className="delivery-option" onClick={updateDeliveryOption}>
      <input type="radio" checked={deliveryOptionId === id}
        className="delivery-option-input"
        name={`delivery-option-${cartItemId}`}
        onChange={() => { }}
      />
      <div>
        <div className="delivery-option-date">
          {dayjs(estimatedDeliveryTimeMs).format('dddd, MMMM D')}
        </div>
        <div className="delivery-option-price">
          {price === 0 ? 'FREE Shipping' : `${formatCurrency(price)} - Shipping`}
        </div>
      </div>
    </div>
  )
}