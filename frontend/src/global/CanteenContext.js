import React, { useState, useEffect, createContext } from "react";
import { IP } from "../IPDetails";
import axios from "axios";
import uuid from "react-uuid";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [detailProduct, setDetailProduct] = useState({
    id: 1,
    title: "food-item",
    imgUrl: "",
    price: 10,
    itemDetails:
      "Lorem ipsum dolor amet offal town scenester normcore, ethical helvetica photo booth gentrify.",
    inCart: false,
    count: 0,
    total: 0,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState({
    id: 1,
    title: "food-item",
    imgUrl: "",
    price: 10,
    itemDetails:
      "Lorem ipsum dolor amet offal town scenester normcore, ethical helvetica photo booth gentrify.",
    inCart: false,
    count: 0,
    total: 0,
  });
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const [cartTax, setCartTax] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [storeProducts, setStoreProducts] = useState([]);

  const setProducts = (data) => {
    let tempProducts = [];
    data.forEach((item) => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    setStoreProducts(tempProducts);
  };

  useEffect(() => {
    axios
      .get(`${IP}/canteen`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log("ProductProvider -> err", err));
  }, []);

  const getItem = (id) => {
    const product = storeProducts.filter((item) => item._id === id);
    return product[0];
  };

  const handleDetail = (id) => {
    const product = getItem(id);
    setDetailProduct(product);
  };

  const addToCart = (id) => {
    let tempProducts = [...storeProducts];
    const index = tempProducts.indexOf(getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    setStoreProducts(tempProducts);
    setCart([...cart, product]);
    addTotals();
  };

  const openModal = (id) => {
    const product = getItem(id);
    setModalProduct(product);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const increment = (id) => {
    let tempCart = [...cart];
    const selectedProduct = tempCart.find((item) => item._id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    if (product.count < 5) {
      product.count = product.count + 1;
      product.total = product.count * product.price;
    } else {
      alert("YOU CANT ORDER MORE THAN 5 ITEMS AT ONCE");
    }
    setCart([...tempCart]);
    addTotals();
  };
  const decrement = (id) => {
    let tempCart = [...cart];
    const selectedProduct = tempCart.find((item) => item._id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count = product.count - 1;
    if (product.count === 0) {
      removeItem(id);
    } else {
      product.total = product.count * product.price;
      setCart([...tempCart]);
      addTotals();
    }
  };
  const removeItem = (id) => {
    let tempProducts = [...storeProducts];
    let tempCart = [...cart];
    tempCart = tempCart.filter((item) => item._id !== id);
    const index = tempProducts.indexOf(getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = false;
    removedProduct.total = false;
    setCart([...tempCart]);
    setStoreProducts([...tempProducts]);
    addTotals();
  };
  const placeOrder = () => {
    // function pick(obj, keys) {
    //   return keys
    //     .map((property) =>
    //       property in obj ? { [property]: obj[property] } : {}
    //     )
    //     .reduce((res, o) => Object.assign(res, o), {});
    // }
    // const orderDataToBeSent = cart.map((item) => {
    //   console.log(pick(item, ["count", "id"]));
    //   return pick(item, ["count", "id"]);
    // });

    let obj = {};
    cart.forEach((item) => {
      obj[item.id] = item.count;
    });
    // console.log("hi", obj);
    const orderDataToBeSent = {};
    // orderDataToBeSent[Date.now()] = obj;
    orderDataToBeSent[uuid()] = obj;

    console.log("orderDataToBeSent");
    console.log(orderDataToBeSent);

    axios
      .post(`${IP}/api/CanteenApi/`, orderDataToBeSent)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setCart([]);
    // setProducts();
    addTotals();

    // setState(
    //   () => {
    //     return { cart: [] };
    //   },
    //   () => {
    //     setProducts();
    //     addTotals();
    //   }
    // );
  };

  const clearCart = () => {
    cart.forEach((cartProduct, index) => {
      removeItem(cartProduct._id);
    });
  };

  const addTotals = () => {
    let subTotal = 0;
    cart.map((item) => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    setCartSubTotal(subTotal);
    setCartTax(tax);
    setCartTotal(total);
  };

  return (
    <ProductContext.Provider
      value={{
        cart: cart,
        detailProduct: detailProduct,
        modalOpen: modalOpen,
        modalProduct: modalProduct,
        cartSubTotal: cartSubTotal,
        cartTax: cartTax,
        cartTotal: cartTotal,
        storeProducts: storeProducts,
        setCart: setCart,
        setDetailProduct: setDetailProduct,
        setModalOpen: setModalOpen,
        setModalProduct: setModalProduct,
        setCartSubTotal: setCartSubTotal,
        setCartTax: setCartTax,
        setCartTotal: setCartTotal,
        setStoreProducts: setStoreProducts,
        handleDetail: handleDetail,
        addToCart: addToCart,
        openModal: openModal,
        closeModal: closeModal,
        increment: increment,
        decrement: decrement,
        removeItem: removeItem,
        clearCart: clearCart,
        placeOrder: placeOrder,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
