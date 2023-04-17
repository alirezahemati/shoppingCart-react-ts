import { Col, Row } from "react-bootstrap";
import products from "../data/products.json";
import ProductCard from "../components/shop/ProductCard";

function Shop() {
  return (
    <>
      <h2 className="text-3xl font-bold mb-5">Shop</h2>
      <Row xs={1} md={2} lg={3}>
        {products.map((product) => {
          const { id } = product;
          return (
            <Col key={id}>
              <ProductCard {...product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
}

export default Shop;
