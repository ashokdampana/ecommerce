import React, { createContext, useReducer, useEffect } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const item = action.payload;
      const exists = state.cartItems.find(i => i._id === item._id);
      let newItems;
      if (exists) {
        newItems = state.cartItems.map(i =>
          i._id === item._id ? { ...i, qty: i.qty + (item.qty || 1) } : i
        );
      } else {
        newItems = [...state.cartItems, { ...item, qty: item.qty || 1 }];
      }
      return { cartItems: newItems };
    }
    case 'REMOVE_ITEM':
      return { cartItems: state.cartItems.filter(i => i._id !== action.payload) };
    case 'CLEAR_CART':
      return { cartItems: [] };
    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  const addToCart = (product, qty = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { ...product, qty } });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{ cartItems: state.cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
