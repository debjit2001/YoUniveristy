import React, { Component } from "react";
import Product from "./Product";
import { ProductConsumer } from "../context";
import { Link } from "react-router-dom";
import { ButtonContainer } from "./Button";
import "../CanteenPage.css";

export default class ProductList extends Component {
  render() {
    return (
      <React.Fragment>
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
        {/* bhsj */}
        <div className="py-5">
          <div className="container">
            <h2 className="title">Food Items</h2>

            <div className="row">
              <ProductConsumer>
                {(value) => {
                  return value.products.map((product) => {
                    return <Product key={product.id} product={product} />;
                  });
                }}
              </ProductConsumer>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
