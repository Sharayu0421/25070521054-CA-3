import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('techcart_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const [toasts, setToasts] = useState([]);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('techcart_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const addToCart = (product, qty = 1) => {
    const quantity = Math.max(1, parseInt(qty) || 1);

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.product === (product._id || product.product)
      );

      if (existingIndex > -1) {
        const existingItem = prevItems[existingIndex];
        const newQty = Math.min(
          existingItem.quantity + quantity,
          product.countInStock || 99
        );

        const updated = [...prevItems];
        updated[existingIndex] = {
          ...existingItem,
          quantity: newQty,
        };
        showToast(`Updated "${product.name}" quantity to ${newQty}`, 'success');
        return updated;
      } else {
        const newItem = {
          product: product._id || product.product,
          name: product.name,
          image: product.image,
          price: product.price,
          originalPrice: product.originalPrice || product.price,
          countInStock: product.countInStock !== undefined ? product.countInStock : 10,
          quantity: Math.min(quantity, product.countInStock || 99),
        };
        showToast(`Added "${product.name}" to cart!`, 'success');
        return [...prevItems, newItem];
      }
    });
  };

  const updateQuantity = (productId, qty) => {
    const quantity = parseInt(qty);
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.product === productId) {
          const clampedQty = Math.min(quantity, item.countInStock || 99);
          return { ...item, quantity: clampedQty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find((i) => i.product === productId);
      if (itemToRemove) {
        showToast(`Removed "${itemToRemove.name}" from cart`, 'info');
      }
      return prevItems.filter((i) => i.product !== productId);
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('techcart_cart');
  };

  // Calculations
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice >= 100 || itemsPrice === 0 ? 0 : 10;
  const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
  const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));

  const value = {
    cartItems,
    cartCount,
    itemsPrice: Number(itemsPrice.toFixed(2)),
    shippingPrice,
    taxPrice,
    totalPrice,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    showToast,
    toasts,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
