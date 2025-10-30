import { useState, useEffect } from 'react';
import axios from 'axios'
import CheckoutHeader from './CheckoutHeader';
import CartProduct from './CartProduct';
import PaymentSummary from './PaymentSummary';
import { calculateCartQuantity } from '../../utils/cart';
import './CheckoutPage.css';

export default function CheckoutPage({ cart, loadCart }) {
  const [paymentSummary, setPaymentSummary] = useState({});

  useEffect(() => {
    const fetchPaymentSummary = async () => {
      const response = await axios.get('/api/payment-summary')
      setPaymentSummary(response.data);
    }

    fetchPaymentSummary();
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
                cartItemId={item.id}
                productId={item.productId}
                productName={item.product.name}
                productImage={item.product.image}
                productPriceCents={item.product.priceCents}
                quantity={item.quantity}
                deliveryOptionId={item.deliveryOptionId}
                loadCart={loadCart}
              />
            )}
          </div>
          <div className="payment-summary">
            <PaymentSummary paymentSummary={paymentSummary} />
          </div>
        </div>
      </div>
    </>
  )
}