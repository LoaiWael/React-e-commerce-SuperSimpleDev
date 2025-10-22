import './CartProduct.css'

export default function CartProduct({ productName, productImage, productPrice, quantity, deliveryOptionId }) {
  return (
    <div className="cart-item-container">
      <div className="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div className="cart-item-details-grid">
        <img className="product-image"
          src={productImage} />

        <div className="cart-item-details">
          <div className="product-name">
            {productName}
          </div>
          <div className="product-price">
            {productPrice}
          </div>
          <div className="product-quantity">
            <span>
              Quantity: <span className="quantity-label">{quantity}</span>
            </span>
            <span className="update-quantity-link link-primary">
              Update
            </span>
            <span className="delete-quantity-link link-primary">
              Delete
            </span>
          </div>
        </div>

        <div className="delivery-options">
          <div className="delivery-options-title">
            Choose a delivery option:
          </div>
          <div className="delivery-option">
            <input type="radio" checked
              className="delivery-option-input"
              name="delivery-option-1" />
            <div>
              <div className="delivery-option-date">
                Tuesday, June 21
              </div>
              <div className="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div className="delivery-option">
            <input type="radio"
              className="delivery-option-input"
              name="delivery-option-1" />
            <div>
              <div className="delivery-option-date">
                Wednesday, June 15
              </div>
              <div className="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div className="delivery-option">
            <input type="radio"
              className="delivery-option-input"
              name="delivery-option-1" />
            <div>
              <div className="delivery-option-date">
                Monday, June 13
              </div>
              <div className="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// function findCartProducts(cart) {
//   let products = [];
//   cart.forEach(item => {
//     if (item.productId ===)
//   });
// }