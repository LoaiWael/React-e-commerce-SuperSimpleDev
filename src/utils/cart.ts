import axios from "axios";
import type { cartItem } from "../types/index"

export function calculateCartQuantity(cart: cartItem[]) {
  let counter = 0;
  cart.forEach(cartItem => {
    counter += cartItem.quantity;
  });
  return counter;
}

export async function addToCart(productId: string, quantity: number, loadCart: CallableFunction) {
  await axios.post('/api/cart-items', {
    productId,
    quantity
  });
  await loadCart();
}