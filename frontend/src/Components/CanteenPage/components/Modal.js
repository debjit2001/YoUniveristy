import React, { useContext } from "react";
import styled from "styled-components";
import { ProductContext } from "../../../context/CanteenContext";
import { ButtonContainer } from "./Button";
import { Link } from "react-router-dom";

const Modal = () => {
  const { modalOpen, closeModal, modalProduct } = useContext(ProductContext);
  if (!modalOpen) {
    return null;
  } else {
    return (
      <ModalContainer>
        <div className="container">
          <div className="row">
            <div
              id="modal"
              className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize p-5"
            >
              <h5>food item added to cart</h5>
              <img
                src={`http://localhost:5000/${modalProduct.imgUrl}`}
                className="img-fluid"
                alt="product"
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
          </div>
        </div>
      </ModalContainer>
    );
  }
};

export default Modal;
const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  #modal {
    background: var(--mainWhite);
  }
`;
