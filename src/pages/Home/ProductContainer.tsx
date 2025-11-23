import { useRef, useState } from "react";
import { addToCart } from "../../utils/cart.js";
import checkMark from "../../assets/images/icons/checkmark.png";
import "./ProductContainer.css";

interface productContainer {
  productId: string,
  name: string,
  image: string,
  rating: { stars: number, count: number },
  price: string,
  loadCart: CallableFunction
}

export default function ProductContainer({
  productId,
  name,
  image,
  rating,
  price,
  loadCart,
}: productContainer) {
  const [quantity, setQuantity] = useState(1);
  const addedToCartInfoElem = useRef<HTMLDivElement>(null);

  const handleAddToCart = async (productId: string, quantity: number, loadCart: CallableFunction) => {
    await addToCart(productId, quantity, loadCart);

    const addedMessage = addedToCartInfoElem.current;

    addedMessage!.style.opacity = '1';
    setTimeout(() => {
      addedMessage!.style.opacity = '0';
    }, 1500);
  };

  return (
    <div className="product-container">
      <div className="product-image-container">
        <img className="product-image" src={image} />
      </div>

      <div className="product-name limit-text-to-2-lines">{name}</div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          src={`images/ratings/rating-${rating.stars * 10}.png`}
        />
        <div className="product-rating-count link-primary">{rating.count}</div>
      </div>

      <div className="product-price">{price}</div>

      <div className="product-quantity-container">
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className="added-to-cart" ref={addedToCartInfoElem}>
        <img src={checkMark} />
        Added
      </div>

      <button
        className="add-to-cart-button button-primary"
        onClick={() => handleAddToCart(productId, quantity, loadCart)}
      >
        Add to Cart
      </button>
    </div>
  );
}
