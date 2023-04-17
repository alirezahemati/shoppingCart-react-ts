import { createContext, useContext, ReactNode, useState } from "react";
import CartSidebar from "../components/CartSidebar";
import { useLocalStorage } from "../hooks/useLocalStorage";

type CartProviderProps = {
  children: ReactNode;
};

type CartContextValue = {
  openCart: () => void;
  closeCart: () => void;
  getItemQty: (id: number) => number;
  addItem: (id: number) => void;
  decreaseItem: (id: number) => void;
  removeItem: (id: number) => void;
  getCartItems: () => CartItem[];
  cartQty: number;
};

type CartItem = {
  id: number;
  qty: number;
};

const CartContext = createContext({} as CartContextValue);

export function CartProvider({ children }: CartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  // const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "cartItems",
    []
  );

  const cartQty = cartItems.reduce((qty, item) => qty + item.qty, 0);

  const getItemQty = (id: number) => {
    return cartItems.find((item) => item.id === id)?.qty || 0;
  };

  const addItem = (id: number) => {
    const findItem = cartItems.find((item) => item.id === id);
    if (!findItem) {
      const item = {
        id,
        qty: 1,
      };
      setCartItems((prev) => [...prev, item]);
    } else {
      const newList = cartItems.map((item) => {
        if (item.id === id) {
          return { ...item, qty: item.qty + 1 };
        }
        return item;
      });
      setCartItems(newList);
    }
  };

  const decreaseItem = (id: number) => {
    const findItem = cartItems.find((item) => item.id === id);
    if (!findItem) return;
    const newList = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, qty: item.qty - 1 };
      }
      return item;
    });
    setCartItems(newList);
  };

  const removeItem = (id: number) => {
    const findItem = cartItems.find((item) => item.id === id);
    if (!findItem) return;
    const newList = cartItems.filter((item) => item.id !== id);
    setCartItems(newList);
  };

  const getCartItems = () => cartItems || [];

  const openCart = () => setIsOpen(true);

  const closeCart = () => setIsOpen(false);

  return (
    <CartContext.Provider
      value={{
        getItemQty,
        addItem,
        decreaseItem,
        removeItem,
        getCartItems,
        cartQty,
        openCart,
        closeCart,
      }}
    >
      {children}
      <CartSidebar isOpen={isOpen} />
    </CartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}
