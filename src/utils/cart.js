import axios from "axios";

export function calculateCartQuantity(cart) {
  let counter = 0;
  cart.forEach(cartItem => {
    counter += cartItem.quantity;
  });
  return counter;
}

export async function addToCart(productId, quantity,loadCart) {
  await axios.post('/api/cart-items', {
    productId,
    quantity
  });
  await loadCart();
}