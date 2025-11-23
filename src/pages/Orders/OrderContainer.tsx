import OrderHeader from "./OrderHeader";
import OrderedProduct from "./OrderedProduct";
import "./OrderContainer.css";
import type { order } from "../../types";

interface orderContainer extends order {
  loadCart: CallableFunction
}

export default function OrderContainer({
  id,
  orderTimeMs,
  totalCostCents,
  products,
  loadCart,
}: orderContainer) {
  return (
    <div className="order-container">
      <OrderHeader
        id={id}
        orderTimeMs={orderTimeMs}
        totalCostCents={totalCostCents}
      />

      <div className="order-details-grid">
        {products.map((list) => (
          <OrderedProduct
            key={list.productId}
            orderId={id}
            estimatedDeliveryTimeMs={+list.estimatedDeliveryTimeMs!}
            productDetails={list.product!}
            quantity={list.quantity}
            loadCart={loadCart}
          />
        ))}
      </div>
    </div>
  );
}
