import React, { useContext } from "react";
import { ProductContext } from "../../../global/CanteenContext";
import { Link } from "react-router-dom";
import { ButtonContainer } from "./Button";

const Details = () => {
  const { detailProduct, addToCart, openModal } = useContext(ProductContext);
  console.log("Details -> detailProduct", detailProduct);

  return (
    <div className="container py-2">
      <div className="row">
        <div className="col-10 mx-auto text-center text-slamted text-blue my-3">
          <h1>{detailProduct.title}</h1>
        </div>
      </div>
      {/*product info*/}
      <div className="row">
        <div className="col-10 mx-auto col-md-6 my-3 ">
          <img
            src={`http://localhost:5000/${detailProduct.imgUrl}`}
            className="img-fluid"
            alt="product"
          />
        </div>
        {/*product text*/}
        <div className="col-10 mx-auto col-md-6 my-2 ">
          <h4 className="text-blue">
            <strong>
              price: <span>₹</span>
              {detailProduct.price}
            </strong>
          </h4>
          <p className="text-muted lead">{detailProduct.itemDetails}</p>
          <div>
            <Link to="/canteen">
              <ButtonContainer>Back to Product List</ButtonContainer>
            </Link>
            <ButtonContainer
              disabled={detailProduct.inCart ? true : false}
              onClick={() => {
                addToCart(detailProduct._id);
                openModal(detailProduct._id);
              }}
            >
              {detailProduct.inCart
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
};

export default Details;
