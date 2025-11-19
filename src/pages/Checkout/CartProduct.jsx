import { useRef, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import DeliveryOption from "./DeliveryOption";
import { formatCurrency } from "../../utils/money";
import "./CartProduct.css";

export default function CartProduct({
  cartItemId,
  productId,
  productName,
  productImage,
  productPriceCents,
  quantity,
  deliveryOptions,
  deliveryOptionId,
  loadCart,
}) {
  const [wantUpdateQuantity, setWantUpdateQuantity] = useState(false);
  const [newQuantity, setNewQuantity] = useState(quantity);
  const currentQuantityElem = useRef(null);

  const deleteCartProduct = async () => {
    await axios.delete(`/api/cart-items/${productId}`);
    await loadCart();
  };

  const updateQuantity = async () => {
    if (wantUpdateQuantity) {
      if (newQuantity !== Number(quantity)) {
        await axios.put(`/api/cart-items/${productId}`, {
          quantity: newQuantity,
        });
        await loadCart();
      }
      currentQuantityElem.current.style.display = "unset";
      setWantUpdateQuantity(false);
    } else {
      currentQuantityElem.current.style.display = "none";
      setWantUpdateQuantity(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      updateQuantity(Number(e.target.value));
    } else if (e.key == "Escape") {
      currentQuantityElem.current.style.display = "unset";
      setWantUpdateQuantity(false);
    }
  };

  return (
    <div className="cart-item-container">
      <div className="delivery-date">
        Delivery date:{" "}
        {dayjs(
          deliveryOptions.find((option) => option.id === deliveryOptionId)
            ?.estimatedDeliveryTimeMs
        ).format("dddd, MMMM D")}
      </div>

      <div className="cart-item-details-grid">
        <img className="product-image" src={productImage} />

        <div className="cart-item-details">
          <div className="product-name">{productName}</div>
          <div className="product-price">
            {formatCurrency(productPriceCents)}
          </div>
          <div className="product-quantity">
            <span>
              Quantity:{" "}
              <span className="quantity-label" ref={currentQuantityElem}>
                {quantity}
              </span>
            </span>
            {wantUpdateQuantity && (
              <input
                type="number"
                max="10"
                min="1"
                value={newQuantity}
                onChange={(e) => setNewQuantity(Number(e.target.value))}
                onKeyDown={handleKeyDown}
              />
            )}
            <span
              className="update-quantity-link link-primary"
              onClick={() => updateQuantity()}
            >
              Update
            </span>
            <span
              className="delete-quantity-link link-primary"
              onClick={deleteCartProduct}
            >
              Delete
            </span>
          </div>
        </div>

        <div className="delivery-options">
          <div className="delivery-options-title">
            Choose a delivery option:
          </div>
          {deliveryOptions.map((option) => (
            <DeliveryOption
              key={option.id}
              id={option.id}
              productId={productId}
              cartItemId={cartItemId}
              estimatedDeliveryTimeMs={option.estimatedDeliveryTimeMs}
              price={option.priceCents}
              deliveryOptionId={deliveryOptionId}
              loadCart={loadCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
