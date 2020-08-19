import React, { Component } from "react";
import { IP } from "../../IPDetails";
import axios from "axios";
import uuid from "react-uuid";

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: {
      id: 1,
      title: "food-item",
      imgUrl: "",
      price: 10,
      itemDetails:
        "Lorem ipsum dolor amet offal town scenester normcore, ethical helvetica photo booth gentrify.",
      inCart: false,
      count: 0,
      total: 0,
    },
    cart: [],
    modalOpen: false,
    modalProduct: {
      id: 1,
      title: "food-item",
      imgUrl: "",
      price: 10,
      itemDetails:
        "Lorem ipsum dolor amet offal town scenester normcore, ethical helvetica photo booth gentrify.",
      inCart: false,
      count: 0,
      total: 0,
    },
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
    storeProducts: [],
  };

  setProducts = (props) => {
    console.log("inside setProducts");
    let tempProducts = [];
    this.state.storeProducts.forEach((item) => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    this.setState(
      () => {
        return { products: tempProducts };
      },
      () => {
        console.log("this.state after setting products", this.state);
      }
    );
  };

  componentDidMount() {
    axios.get(`${IP}/api/canteen`).then((res) => {
      console.log("res.data->", res.data);
      this.setState(
        {
          storeProducts: res.data,
        },
        () => this.setProducts()
      );
    });
  }

  getItem = (id) => {
    const product = this.state.products.find((item) => item.id === id);
    return product;
  };

  handleDetail = (id) => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product };
    });
  };

  addToCart = (id) => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    this.setState(
      () => {
        return { products: tempProducts, cart: [...this.state.cart, product] };
      },
      () => this.addTotals()
    );
  };

  openModal = (id) => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };
  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };

  increment = (id) => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find((item) => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    if (product.count < 5) {
      product.count = product.count + 1;
      product.total = product.count * product.price;
    } else {
      alert("YOU CANT ORDER MORE THAN 5 ITEMS AT ONCE");
    }

    this.setState(
      () => {
        return { cart: [...tempCart] };
      },
      () => {
        this.addTotals();
      }
    );
  };
  decrement = (id) => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find((item) => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count = product.count - 1;
    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.count * product.price;
      this.setState(
        () => {
          return { cart: [...tempCart] };
        },
        () => {
          this.addTotals();
        }
      );
    }
  };
  removeItem = (id) => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];

    tempCart = tempCart.filter((item) => item.id !== id);
    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = false;
    removedProduct.total = false;

    this.setState(
      () => {
        return {
          cart: [...tempCart],
          products: [...tempProducts],
        };
      },
      () => {
        this.addTotals();
      }
    );
  };
  placeOrder = () => {
    function pick(obj, keys) {
      return keys
        .map((property) =>
          property in obj ? { [property]: obj[property] } : {}
        )
        .reduce((res, o) => Object.assign(res, o), {});
    }
    // const orderDataToBeSent = this.state.cart.map((item) => {
    //   console.log(pick(item, ["count", "id"]));
    //   return pick(item, ["count", "id"]);
    // });

    let obj = {};
    this.state.cart.forEach((item) => {
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

    this.setState(
      () => {
        return { cart: [] };
      },
      () => {
        this.setProducts();
        this.addTotals();
      }
    );
  };
  clearCart = () => {
    this.setState(
      () => {
        return { cart: [] };
      },
      () => {
        this.setProducts();
        this.addTotals();
      }
    );
  };
  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map((item) => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    this.setState(() => {
      return {
        cartSubTotal: subTotal,
        cartTax: tax,
        cartTotal: total,
      };
    });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          // products: this.state
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
          placeOrder: this.placeOrder,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
