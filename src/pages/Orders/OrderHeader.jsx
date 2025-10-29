import dayjs from 'dayjs'
import { formatCurrency } from '../../utils/money'
import './OrderHeader.css'

export default function OrderHeader({ orderTimeMs, totalCostCents, id }) {
  return (
    <div className="order-header">
      <div className="order-header-left-section">
        <div className="order-date">
          <div className="order-header-label">Order Placed:</div>
          <div>{dayjs(orderTimeMs).format('MMMM D')}</div>
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
  )
}