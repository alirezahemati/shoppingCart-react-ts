import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Nav, Navbar as NavbarBs, Button } from "react-bootstrap";
import { useCartContext } from "../context/CartContext";

type Props = {};

const Navbar = (props: Props) => {
  const { cartQty, openCart, closeCart } = useCartContext();

  return (
    <NavbarBs className="bg-dark text-light mb-3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink} className="text-light">
            Home
          </Nav.Link>
          <Nav.Link to="/shop" as={NavLink} className="text-light">
            Shop
          </Nav.Link>
          <Nav.Link to="/about" as={NavLink} className="text-light">
            About
          </Nav.Link>
        </Nav>
        <Button
          variant="outline-light"
          onClick={openCart}
          className="w-12 h-12 relative text-lg"
        >
          <i className="bi bi-cart"></i>
          <span className="flex justify-center items-center rounded-full bg-red-500 text-white p-1 text-base w-6 h-6 absolute -top-2 -right-3">
            {cartQty || 0}
          </span>
        </Button>
      </Container>
    </NavbarBs>
  );
};

export default Navbar;
