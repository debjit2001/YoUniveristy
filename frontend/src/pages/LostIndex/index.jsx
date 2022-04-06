// Third party import
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Tippy from "@tippy.js/react";
import axios from "axios";
import { Spinner } from "reactstrap";
//StyleSheet import
import "tippy.js/dist/tippy.css";
import "react-responsive-modal/styles.css";
import styles from "./styles.module.css";
// Import from Local
import { IP } from "IPDetails";
//Local Component import
import Form from "Components/LostFoundPage/Form";
import ItemCard from "Components/LostFoundPage/ItemCard";

// Lost function : A function to posts the details of the lost items to the database
const Lost = () => {
  /**
   *   State declarations
   */
  const [open, _open] = useState(false);
  const [prevLostItems, _prevLostItems] = useState([]);
  /**
   * UseEffects
   */
  // UseEffects to fetch the new lost items from the database
  useEffect(() => {
    _fetchNewLostHandler();
  }, []);
  /**
   * Method Declarations
   */
  // Method to posts the details of the lost items into the MongoDB database
  const submitHandler = async (formData) => {
    const fd = new FormData();
    fd.append("email", formData.email);
    fd.append("lostItemDetails", formData.ItemDetails);
    fd.append("lostItemImage", formData.ItemImage);
    fd.append("itemName", formData.itemName);
    fd.append("lostDate", formData.date);
    fd.append("name", formData.name);
    try {
      await axios.post(`${IP}/lost`, fd, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      if (
        !formData.email ||
        !formData.ItemDetails ||
        !formData.ItemImage ||
        !formData.itemName ||
        !formData.date ||
        !formData.name
      ) {
        alert("Please fill out all the necessary fields");
      } else {
        alert("YOUR FORM IS SUCCESSFULLY SUBMITTED");
        onCloseModal();
        _fetchNewLostHandler();
      }
    } catch (error) {
      onCloseModal();
      if (error.response.status === 400) alert("Error : Bad Request");
      if (error.response.status === 404) alert("Error : Not Found");
      if (error.response.status === 500) alert("Error : Internal Server Error");
    }
  };

  //Function to change the state of the modal from close to open
  const onOpenModal = () => {
    _open((prev) => (prev = true));
  };

  //Function to change the state of the modal from open to close
  const onCloseModal = () => {
    _open((prev) => (prev = false));
  };

  // Method to get the details of the new lost item
  const _fetchNewLostHandler = async () => {
    try {
      const response = await axios.get(`${IP}/lost`);
      _prevLostItems((prev) => (prev = response?.data?.lostItems.reverse()));
    } catch (error) {
      if (error?.response?.status === 400) alert("Error : Bad Request");
      if (error?.response?.status === 404) alert("Error : Not Found");
      if (error?.response?.status === 500)
        alert("Error : Internal Server Error");
    }
  };
  /**
   * Method to be called on submit button click
   */
  const _onSubmitButtonClick = (formEntry) => {
    submitHandler(formEntry);
  };

  return (
    <div className={styles.wrapper}>
      <Tippy
        content="Lost Form click here"
        delay={200}
        placement="bottom"
        theme="honeybee"
      >
        <Button onClick={onOpenModal} variant="primary" size="lg" block>
          LOST FORM
        </Button>
      </Tippy>
      <Form
        open={open}
        onCloseModal={onCloseModal}
        onSubmitButtonHandler={_onSubmitButtonClick}
      />
      <h2 style={{ textAlign: "center" }} className={styles.heading}>
        LOST ITEMS HERE...
      </h2>
      <br />
      <div className={`${styles.lostItems}`}>
        {Object.keys(prevLostItems).length ? (
          prevLostItems.map((post, index) => (
            <ItemCard
              key={index}
              imgURL={post?.lostItemImage}
              itemName={post?.itemName}
              date={post?.lostDate}
              itemDetails={post?.lostItemDetails}
              authorName={post?.name}
              authorEmail={post?.email}
            />
          ))
        ) : (
          <Spinner role="grow" />
        )}
      </div>
    </div>
  );
};

export default Lost;
