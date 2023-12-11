import { createContext, useContext, useState } from "react";
const ShoppingCartContext = createContext(); // by convention, use PascalCase for components and contexts
export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const cartQuantity = cartItems.reduce((quantity, item) => 
  item.quantity + quantity, 0)



  function getItemQuantity(id) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(product) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === product.id) == null) {
        // Include all relevant product details here
        return [...currItems, { ...product, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === product.id) {
            // Just update quantity, keep the rest of the product details
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  
  function decreaseCartQuantity(product) {
    setCartItems((currItems) => {
      const existingItem = currItems.find((item) => item.id === product.id);
      if (existingItem && existingItem.quantity === 1) {
        return currItems.filter((item) => item.id !== product.id);
      } else if (existingItem) {
        return currItems.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
      return currItems; // Return current items if the product is not found
    });
  }
  
  function removeFromCart(id) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }
  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
