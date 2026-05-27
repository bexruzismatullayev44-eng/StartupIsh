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

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const getUserId = () => localStorage.getItem("token") || "guest";

  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem(`basket_${getUserId()}`);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const savedCart = localStorage.getItem(`basket_${getUserId()}`);
      setCart(savedCart ? JSON.parse(savedCart) : []);
    };

    window.addEventListener("storage", handleStorageChange);

    const interval = setInterval(handleStorageChange, 500);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(`basket_${getUserId()}`, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (Worker: Worker) => {
    setCart((prevCart) => {
      const currentItem = prevCart.find((c) => c.id === Worker.id);
      if (currentItem) {
        return prevCart.map((c) =>
          c.id === Worker.id ? { ...c, quantity: c.quantity + 1 } : c,
        );
      }
      return [...prevCart, { ...Worker, quantity: 1 }];
    });
  };

  const increaseQuantity = (id: string) => {
    setCart((prev) =>
      prev.map((c) => (c.id === id ? { ...c, quantity: c.quantity + 1 } : c)),
    );
  };

  const decreaseQuantity = (id: string) => {
    setCart((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, quantity: Math.max(1, c.quantity - 1) } : c,
      ),
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  const clearAll = () => {
    setCart([]);
    localStorage.removeItem(`basket_${getUserId()}`);
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
