let cartItems = [];

export function addToCart(product, quantity, unit) {
  cartItems.push({ ...product, quantity, unit });
}

export function getCartItems() {
  return cartItems;
}

export function clearCart() {
  cartItems = [];
}