import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ProductContext } from "../../../global/CanteenContext";
import Tippy from "@tippy.js/react";
import PropTypes from "prop-types";

const Product = ({ product }) => {
  const { handleDetail, addToCart, openModal, decrement, increment } =
    useContext(ProductContext);
  const { _id, price, inCart, count, imgUrl, title } = product;
  return (
    //ProductWrapper is a styled component(go down this js file to know more) not related to global
    <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
      <div className="card">
        <div
          // className="img-container p-5"
          className="img-container"
          onClick={() => handleDetail(_id)}
        >
          <Link to="/canteenItemDetails">
            <Tippy
              content="click here for details"
              delay={100}
              placement="right-start"
              theme="honeybee"
            >
              <img
                src={`http://localhost:5000/${imgUrl}`}
                alt="product"
                className="card-img-top"
                width="70%"
                height="100px"
              />
            </Tippy>
          </Link>
          <button
            className="card-btn"
            disabled={inCart ? true : false}
            onClick={() => {
              addToCart(_id);
              openModal(_id);
            }}
          >
            {inCart ? (
              // <p className="text-capitalize mb=0" disabled>
              // {" "}
              <div>
                <span
                  className="btn btn-black mx-1"
                  onClick={() => decrement(_id)}
                >
                  -
                </span>
                <span className="btn btn-black mx-1">{count}</span>
                <span
                  className="btn btn-black mx-1"
                  onClick={() => increment(_id)}
                >
                  +
                </span>
              </div>
            ) : (
              // </p>
              <i className="fas fa-cart-plus" />
            )}
          </button>
        </div>

        {/*cart footer*/}
        <div className="card-footer d-flex justify-content-between">
          <p className="align-self-center mb-0">{title}</p>
          <h5 className="text-blue font-italic mb-0">
            <span className="mr-1">₹</span>
            {price}
          </h5>
        </div>
      </div>
    </ProductWrapper>
  );
};

export default Product;

Product.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    imgUrl: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    inCart: PropTypes.bool,
  }).isRequired,
};

const ProductWrapper = styled.div`
.card{
    border-color:var(--navColor);
    transition: all 0.75s linear;
    width: 250px;
    height: auto;
    // display: flex;
}
.card-footer{
    background: var(--navColor);
    border-top:transparent;
    // display:flex;
    // justify-content: space-between;
    // align-self:flex-end;
    transition: all 0.75s linear;
    color: var(--mainWhite);
    // position: absolute;
}

.card-footer{
    font-size:0.6rem;
}

&:hover{
    .card{
        border:0.04 rem sol_id rgba(0,0,0,0.2);
        box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.2);

    }
    .card-footer{
        // background:hsl(210, 22%, 49%);
        // background:  #1E90FF;
        background: #388E8E;
        color:black;
        
    }
}
    .img-container{
        position: relative;
        overflow: hidden;
        padding: 1.3rem 3.5rem 3.5rem 3.5rem;
            }
    .card-img-top{
      
        transition: all 0.5s linear;
    }
    .img-container:hover .card-img-top{
        transform  : scale(1.2);

    }
    .card-btn{
        position: absolute;
        bottom: 0;
        right:0;
        width:100%;
        height: 20%;
        padding:0.2rem 0.4rem;
        background:#c59d5f;
        border:none;
        color: black;
        font-size: 1.2rem;
        border-radius: 1.75rem 1.75rem 0 0;
    }
    .card-btn:active{
      outline:none;
    }
}
`;
