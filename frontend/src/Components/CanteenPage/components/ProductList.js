import React, { useContext } from "react";
import Product from "./Product";
import { ProductContext } from "../../../context/CanteenContext";
import { Link } from "react-router-dom";
import { ButtonContainer } from "./Button";
import "../CanteenPage.css";

const ProductList = () => {
  const { storeProducts } = useContext(ProductContext);
  return (
    <>
      <Link to="/canteenCart" className="ml-auto">
        <ButtonContainer>
          <span className="mr-2">
            <i className="fas fa-cart-plus" />
          </span>
          My Cart
        </ButtonContainer>
      </Link>
      <br />
      <ButtonContainer>
        <span className="mr-2">
          <i className="far fa-laugh-beam" />
        </span>
        log in
      </ButtonContainer>
      <div className="py-5">
        <div className="container">
          <h2 className="title">Food Items</h2>

          <div className="row">
            {storeProducts.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
