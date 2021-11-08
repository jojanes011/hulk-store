import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

const CartContext = React.createContext(null);

function CartContextProvider({ children }) {
  const [cartState, setCartState] = useState([]);

  // Local Storage: setting & getting data
  useEffect(() => {
    const cartStateData = JSON.parse(localStorage.getItem('cartState'));

    if (cartStateData) {
      setCartState(cartStateData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartState', JSON.stringify(cartState));
  }, [cartState]);

  function addToCart(newItem) {
    setCartState((prevItems) => [...prevItems, { ...newItem, uid: nanoid() }]);
  }

  function updateItemCart(item) {
    const index = cartState.findIndex((cart) => cart.id === item.id);
    cartState[index] = item;
    localStorage.setItem('cartState', JSON.stringify(cartState));
  }

  function removeFromCart(uid) {
    setCartState((prevItems) => prevItems.filter((item) => item.uid !== uid));
  }

  function removeAllFromCart(id) {
    setCartState((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  function deleteCart() {
    localStorage.removeItem('cartState');
  }

  return (
    <CartContext.Provider
      value={{
        cartState,
        addToCart,
        removeFromCart,
        removeAllFromCart,
        updateItemCart,
        deleteCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContextProvider, CartContext };
