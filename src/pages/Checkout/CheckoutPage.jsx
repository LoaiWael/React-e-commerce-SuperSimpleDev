import CheckoutHeader from './CheckoutHeader';
import CartProduct from './CartProduct';
import { calculateCartQuantity } from '../../utils/cart';
import { formatCurrency } from '../../utils/money'
import './CheckoutPage.css';

export default function CheckoutPage({ cart }) {
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
                productName={item.product.name}
                productImage={item.product.image}
                productPrice={formatCurrency(item.product.priceCents)}
                quantity={item.quantity}
                deliveryOptionId={item.deliveryOptionId}
              />
            )}
          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">
              Payment Summary
            </div>

            <div className="payment-summary-row">
              <div>Items (3):</div>
              <div className="payment-summary-money">$42.75</div>
            </div>

            <div className="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">$4.99</div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">$47.74</div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">$4.77</div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">$52.51</div>
            </div>

            <button className="place-order-button button-primary">
              Place your order
            </button>
          </div>
        </div>
      </div>
    </>
  )
}