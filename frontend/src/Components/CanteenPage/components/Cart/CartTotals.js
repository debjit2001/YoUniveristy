import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../../../global/CanteenContext";

export default function CartTotals() {
  const { cartSubTotal, cartTax, cartTotal, clearCart, placeOrder } =
    useContext(ProductContext);

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
            <Link to="/canteen">
              <button
                className="btn btn-outline-danger text-uppercase mb-3 px-5"
                type="button"
                onClick={() => clearCart()}
              >
                clear cart
              </button>
            </Link>
            <h5>
              <span className="text-title">subtotal :</span>
              <strong>₹ {cartSubTotal}</strong>
            </h5>
            <h5>
              <span className="text-title">tax :</span>
              <strong>₹ {cartTax}</strong>
            </h5>
            <h5>
              <span className="text-title">total :</span>
              <strong>₹ {cartTotal}</strong>
            </h5>
            <button
              className="btn btn-primary btn-sm text-uppercase mb-1 px-5"
              type="button"
              onClick={() => placeOrder()}
            >
              PLACE ORDER
            </button>
            <br />
            <br />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
