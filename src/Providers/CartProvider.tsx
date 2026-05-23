
import React, { createContext, useContext, useEffect, useState } from "react";
import type { Worker, CartItem } from "../types";


interface CartContextType {
  cart: CartItem[];
  addToCart: (Worker: Worker) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeItem: (id: string) => void;
  clearAll: () => void;
  calculateTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(
    localStorage.getItem("basket")
      ? JSON.parse(localStorage.getItem("basket")!)
      : []
  );

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (Worker: Worker) => {
    const currentItem = cart.find((c) => c.id === Worker.id);
    if (currentItem) {
      currentItem.quantity++;
    } else {
      cart.push({ ...Worker, quantity: 1 });
    }
    setCart([...cart]);
  };

  const increaseQuantity = (id: string) => {
    setCart(cart.map(c => c.id === id ? { ...c, quantity: c.quantity + 1 } : c));
  };

  const decreaseQuantity = (id: string) => {
    setCart(cart.map(c => c.id === id ? { ...c, quantity: Math.max(1, c.quantity - 1) } : c));
  };

  const removeItem = (id: string) => {
    setCart(cart.filter(c => c.id !== id));
  };

  const clearAll = () => {
    setCart([]);
    localStorage.removeItem("basket");
  };

  const calculateTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearAll,
        calculateTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("CartContext ishlamayapti!");
  return context;
};



