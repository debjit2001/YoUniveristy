import React, { Component } from "react";
import { ProductConsumer } from "../context";
import { Link } from "react-router-dom";
import { ButtonContainer } from "./Button";

export default class Details extends Component {
  render() {
    return (
      <ProductConsumer>
        {(value) => {
          const {
            id,
            imgUrl,
            itemDetails,
            price,
            title,
            inCart,
            // count,
          } = value.detailProduct;
          return (
            <div className="container py-2">
              {/*title*/}
              <div className="row">
                <div className="col-10 mx-auto text-center text-slamted text-blue my-3">
                  <h1>{title}</h1>
                </div>
              </div>
              {/*product info*/}
              <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3 ">
                  <img src={imgUrl} className="img-fluid" alt="product" />
                </div>
                {/*product text*/}
                <div className="col-10 mx-auto col-md-6 my-2 ">
                  {/* <h1>{title}</h1> */}
                  <h4 className="text-blue">
                    <strong>
                      price: <span>₹</span>
                      {price}
                    </strong>
                  </h4>
                  {/* <p className="text-capitalize font-weight-bold mt-3 mb-0">
                    some info about the food item:
                  </p> */}
                  <p className="text-muted lead">{itemDetails}</p>
                  {/*buttons*/}
                  <div>
                    <Link to="/canteen">
                      <ButtonContainer>Back to Product List</ButtonContainer>
                    </Link>
                    {/* <Link to="/canteenCart"> */}
                    <ButtonContainer
                      disabled={inCart ? true : false}
                      onClick={() => {
                        value.addToCart(id);
                        value.openModal(id);
                      }}
                    >
                      {inCart
                        ? "in cart"
                        : // ? `${count} plate ${title} in cart`
                          "add to  cart"}
                    </ButtonContainer>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}
