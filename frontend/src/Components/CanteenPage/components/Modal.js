import React, { useContext } from "react";
import styled from "styled-components";
import { ProductContext } from "../../../global/CanteenContext";
import { ButtonContainer } from "./Button";
import ImageWrapper from "Components/Image-Wrapper";
import { Link } from "react-router-dom";

const Modal = () => {
  const { modalOpen, closeModal, modalProduct } =
    useContext(ProductContext);
  if (!modalOpen) {
    return null;
  } else {
    return (
      <ModalContainer>
        <div
          id="modal"
          className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize p-5"
        >
          <h5>food item added to cart</h5>

          <ImageWrapper
            imgSrc={`http://localhost:5000/${modalProduct.imgUrl}`}
            imgAlt="product"
            className="img-fluid"
          />
          <h5>{modalProduct.title}</h5>
          <h5 className="text-muted">price : ₹ {modalProduct.price}</h5>
          <Link to="/canteen">
            <ButtonContainer onClick={() => closeModal()}>
              back to items page
            </ButtonContainer>
          </Link>
          <Link to="/canteenCart">
            <ButtonContainer onClick={() => closeModal()}>
              Go to cart
            </ButtonContainer>
          </Link>
        </div>

        <div className="outer_container" onClick={() => closeModal()}></div>
      </ModalContainer>
    );
  }
};

export default Modal;
const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;

  #modal {
    z-index: 1;
    width: 100%;
    max-height: 100%;
    background: var(--mainWhite);
  }
  .outer_container {
    position: fixed;
    display: block;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    outline: 0;
    background: rgba(0, 0, 0, 0.3);
  }
`;
