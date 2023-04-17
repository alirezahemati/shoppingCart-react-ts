import React from "react";
import { Button, Card } from "react-bootstrap";
import { useCartContext } from "../../context/CartContext";

type ProductProps = {
  id: number;
  title: string;
  price: number;
  imgUrl?: string;
};

const ProductCard = ({ id, price, title, imgUrl }: ProductProps) => {
  const { getItemQty, addItem, removeItem, decreaseItem, getCartItems } =
    useCartContext();

  let qty = getItemQty(id);

  const handleMinesButton = (id: number) => {
    qty > 1 ? decreaseItem(id) : removeItem(id);
  };

  return (
    <Card className="overflow-hidden bg-dark border-white/50">
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        className="object-cover hover:scale-105 ease-in duration-300"
      />
      <Card.Body>
        <Card.Title className="flex justify-between items-center">
          <p className=" font-semibold text-base text-white">{title}</p>
          <p className="text-white text-sm font-light">price: ${price}</p>
        </Card.Title>
        {qty === 0 ? (
          <Button
            onClick={() => addItem(id)}
            className="
            text-sm font-semibold bg-green-500 border-green-500 hover:bg-green-600 hover:border-green-600 p-1 rounded w-full"
          >
            Add to cart
          </Button>
        ) : (
          <div className=" flex justify-start gap-x-2">
            <Button
              onClick={() => addItem(id)}
              className=" flex justify-center items-center bg-green-500 border-green-500 hover:bg-green-600 hover:border-green-600 text-lg font-semibold p-1 rounded text-white w-6 h-6"
            >
              +
            </Button>
            <span>{qty}</span>
            <Button
              onClick={() => handleMinesButton(id)}
              className=" flex justify-center items-center bg-green-500 border-green-500 hover:bg-green-600 hover:border-green-600 text-lg font-semibold p-1 rounded text-white w-6 h-6"
            >
              -
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
