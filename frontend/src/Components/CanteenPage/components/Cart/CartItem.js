import React, { useContext } from "react";
import { ProductContext } from "../../../../global//CanteenContext";

export default function CartItem({ item, value }) {
  const { _id, title, imgUrl, price, total, count } = item;
  const { increment, decrement, removeItem } = useContext(ProductContext);
  return (
    <div className="row my-2 text-capitalize text-center">
      <div className="col-10 mx-auto col-lg-2">
        <img
          src={`http://localhost:5000/${imgUrl}`}
          style={{ width: "5rem", height: "5rem" }}
          className="img-fluid"
          alt="product"
        />
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <span className="d-lg-none">product: </span>
        {title}
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <span className="d-lg-none">price: </span>₹{price}
      </div>
      <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
        <div className="d-flex justify-content-center">
          <div>
            <span
              className="btn btn-black mx-1"
              style={{
                backgroundColor: "#ffffff",
                color: "#000000",
                border: "0.1rem solid hsl(211, 39%, 23%)",
              }}
              onClick={() => decrement(_id)}
            >
              -
            </span>
            <span className="btn btn-black mx-1">{count}</span>
            <span
              className="btn btn-black mx-1"
              style={{
                backgroundColor: "#ffffff",
                color: "#000000",
                border: "0.1rem solid hsl(211, 39%, 23%)",
              }}
              onClick={() => increment(_id)}
            >
              +
            </span>
          </div>
        </div>
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <div className="cart-icon" onClick={() => removeItem(_id)}>
          <i className="fas fa-trash"></i>
        </div>
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <strong> ₹ {total}</strong>
      </div>
    </div>
  );
}
