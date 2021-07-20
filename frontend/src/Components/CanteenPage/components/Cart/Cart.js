import React, { useContext } from "react";
import CartColumns from "./CartColumns";
import EmptyCart from "./EmptyCart";
import { ProductContext } from "../../../../global/CanteenContext";
import CartList from "./CartList";
import CartTotals from "./CartTotals";

const Cart = () => {
  const { cart } = useContext(ProductContext);

  return (
    <section>
      {cart.length > 0 ? (
        <React.Fragment>
          <h2 className="title">Your Cart</h2>
          <CartColumns />
          <CartList value={cart} />
          <CartTotals value={cart} />
        </React.Fragment>
      ) : (
        <EmptyCart />
      )}
    </section>
  );
};

export default Cart;
