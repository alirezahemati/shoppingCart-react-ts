import { ListGroup, Button } from "react-bootstrap";
import products from "../../data/products.json";
import { useCartContext } from "../../context/CartContext";

type Props = {
  id: number;
  qty: number;
};

const CartItem = ({ id, qty }: Props) => {
  const { removeItem } = useCartContext();
  const product = products.find((item) => item.id === id);
  return product ? (
    <ListGroup.Item className="flex justify-between items-center">
      <div className="flex justify-start items-center gap-x-2">
        <img
          className="w-10 h-10 rounded-sm"
          src={product.imgUrl}
          alt={`${product.title}-img`}
        />
        <p>{product.title}</p>
      </div>
      <p className=" text-sm">x{qty}</p>
      <p>${product.price}</p>
      <Button variant="outline-dark" size="sm" onClick={() => removeItem(id)}>
        &times;
      </Button>
    </ListGroup.Item>
  ) : null;
};

export default CartItem;
