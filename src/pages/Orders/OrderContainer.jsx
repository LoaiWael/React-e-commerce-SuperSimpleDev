import OrderHeader from './OrderHeader';
import OrderedProduct from './OrderedProduct';
import './OrderContainer.css';

export default function OrderContainer({ id, orderTimeMs, totalCostCents, products }) {
  return (
    <div className="order-container">

      <OrderHeader id={id} orderTimeMs={orderTimeMs} totalCostCents={totalCostCents} />

      <div className="order-details-grid">
        {products.map(list =>
        (
          <OrderedProduct key={list.productId} orderId={id} productDetails={list.product} quantity={list.quantity} />
        )
        )}
      </div>
    </div>
  )
}