import React from 'react';
import { useShoppingCart } from '@/context/ShoppingCartContext'; // Adjust the path to where your context is defined
import styles from './ShoppingCart.module.css'; // Import the CSS module

const ShoppingCart = () => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    cartItems,
    cartQuantity,
  } = useShoppingCart();

  // Calculate the total price for the cart
  const totalPrice = cartItems.reduce((total, cartItem) => {
    return total + cartItem.quantity * cartItem.price;
  }, 0).toFixed(2); // toFixed(2) to format the price to two decimal places

  // ...

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Shopping Cart</h1>
      <p>Total Items: {cartQuantity}</p>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul className={styles.cartList}>
            {cartItems.map((item) => (
              <li key={item.id} className={styles.cartItem}>
                <div className={styles.cartItemDetails}>
                  <img src={item.image} alt={item.title} className={styles.itemImage} />
                  <span className={styles.itemTitle}>{item.title}</span>
                  <span className={styles.itemPrice}>- ${item.price} x {getItemQuantity(item.id)}</span>
                </div>
                <div className={styles.buttons}>
                  <button onClick={() => increaseCartQuantity(item)} className={styles.button}>+</button>
                  <button onClick={() => decreaseCartQuantity(item)} className={styles.button}>-</button>
                  <button onClick={() => removeFromCart(item.id)} className={styles.button}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <p className={styles.totalPrice}>Total Price: ${totalPrice}</p>
        </div>
      )}
    </div>

  );
};

export default ShoppingCart;
