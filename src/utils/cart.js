export function calculateCartQuantity(cart) {
  let counter = 0;
  cart.forEach(cartItem => {
    counter += cartItem.quantity;
  });
  return counter;
}