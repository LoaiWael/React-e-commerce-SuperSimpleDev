import axios from 'axios'
import { useNavigate } from 'react-router'
import { formatCurrency } from '../../utils/money'
import type { paymentSummary } from '../../types'
import './PaymentSummary.css'

export default function PaymentSummary({ paymentSummary, loadCart }: { paymentSummary: paymentSummary, loadCart: CallableFunction }) {
  const navigate = useNavigate();

  const placeOrder = async () => {
    await axios.post('/api/orders');
    await loadCart();
    setTimeout(() => {
      navigate('/orders');
    }, 1000);
  }

  return (
    <>
      <div className="payment-summary-title">
        Payment Summary
      </div>

      <div className="payment-summary-row">
        <div>Items (3):</div>
        <div className="payment-summary-money">{formatCurrency(paymentSummary.productCostCents)}</div>
      </div>

      <div className="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div className="payment-summary-money">{formatCurrency(paymentSummary.shippingCostCents)}</div>
      </div>

      <div className="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div className="payment-summary-money">{formatCurrency(paymentSummary.totalCostBeforeTaxCents)}</div>
      </div>

      <div className="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div className="payment-summary-money">{formatCurrency(paymentSummary.taxCents)}</div>
      </div>

      <div className="payment-summary-row total-row">
        <div>Order total:</div>
        <div className="payment-summary-money">{formatCurrency(paymentSummary.totalCostCents)}</div>
      </div>

      <button className="place-order-button button-primary" onClick={placeOrder}>
        Place your order
      </button>
    </>
  )
}