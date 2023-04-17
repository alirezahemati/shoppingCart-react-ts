import React from "react";
import { Offcanvas, ListGroup, Toast } from "react-bootstrap";
import { useCartContext } from "../context/CartContext";
import CartItem from "./shop/CartItem";
import products from "../data/products.json";

type CartProps = {
  isOpen: boolean;
};

const CartSidebar = ({ isOpen }: CartProps) => {
  const { closeCart, getCartItems, getItemQty } = useCartContext();
  const cartItems = getCartItems();

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="text-dark">Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="text-dark">
        <ListGroup>
          {cartItems?.[0] &&
            cartItems.map((item) => {
              const itemQty = getItemQty(item.id);
              return <CartItem key={item.id} {...item} />;
            })}
          <div className="pt-4 text-lg font-bold">
            Total: $
            {cartItems.reduce((total, currentItem) => {
              const product = products.find(
                (item) => item.id === currentItem.id
              );
              return total + (product?.price || 0) * currentItem.qty;
            }, 0)}
          </div>
        </ListGroup>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartSidebar;
