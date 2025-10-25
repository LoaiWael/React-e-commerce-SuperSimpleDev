import { useState, useEffect } from 'react';
import axios from 'axios'
import CheckoutHeader from './CheckoutHeader';
import CartProduct from './CartProduct';
import { calculateCartQuantity } from '../../utils/cart';
import { formatCurrency } from '../../utils/money'
import './CheckoutPage.css';

export default function CheckoutPage({ cart }) {
  const [paymentSummary, setPaymentSummary] = useState(null);
  useEffect(() => {
    axios.get('/api/payment-summary')
      .then(response => setPaymentSummary(response.data));
  }, []);

  return (
    <>
      <title>Checkout | E-commerce</title>
      <link rel="icon" href="favicons/cart-favicon.png" />

      <CheckoutHeader cartQuantity={calculateCartQuantity(cart)} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary">
            {cart.map(item =>
              <CartProduct
                key={item.id}
                productName={item.product.name}
                productImage={item.product.image}
                productPrice={formatCurrency(item.product.priceCents)}
                quantity={item.quantity}
                deliveryOptionId={item.deliveryOptionId}
              />
            )}
          </div>
          <div className="payment-summary">
            {paymentSummary && (
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

                <button className="place-order-button button-primary">
                  Place your order
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}