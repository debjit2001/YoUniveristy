// Third party import
import React, { useState, useEffect } from "react";
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

// Found function : A function to posts the details of the found items to the database
const Found = () => {
  /**
   * State declaration
   **/
  const [open, _open] = useState(false);
  const [formData, _formData] = useState(null);
  const [prevFoundItems, _prevFoundItems] = useState([]);

  /**
   *  Method Declaration
   **/
  // Method to posts the details of the found items into the MongoDB database
  const submitHandler = async () => {
    console.log("formData", formData);
   
    const fd = new FormData();
    fd.append("email", "formData.email");
    fd.append("foundItemDetails", "formData.ItemDetails");
    fd.append("foundItemImage", "formData.ItemImage");
    fd.append("itemName", "formData.itemName");
    fd.append("foundDate", "formData.date");
    fd.append("name", "formData.name");
    try {
      if (
        !fd.email ||
        !fd.foundItemDetails ||
        !fd.foundItemImage ||
        !fd.itemName ||
        !fd.foundDate ||
        !fd.name
      ) {
        console.log(fd);
        alert("Please fill out all the necessary fields");
      } else {
        console.log("Found")
        const response = await axios.post(`${IP}/found`, fd, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
        console.log(
          "🚀 ~ file: index.jsx ~ line 54 ~ submitHandler ~ response",
          response
        );

        alert("YOUR FORM IS SUCCESSFULLY SUBMITTED");
        onCloseModal();
        _fetchNewFoundHandler();
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: index.jsx ~ line 64 ~ submitHandler ~ error",
        error
      );
      debugger;
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
    _formData((prev) => (prev = null));
  };

  // Method to get the details of the new found item
  const _fetchNewFoundHandler = async () => {
    try {
      const response = await axios.get(`${IP}/found`);
      _prevFoundItems((prev) => (prev = response?.data));
    } catch (error) {
      if (error.response.status === 400) alert("Error : Bad Request");
      if (error.response.status === 404) alert("Error : Not Found");
      if (error.response.status === 500) alert("Error : Internal Server Error");
    }
  };

  /**
   * UseEffects
   */
  // UseEffects to fetch the new found items from the database
  useEffect(() => {
    _fetchNewFoundHandler();
  }, []);

  useEffect(() => {
    if (formData !== null && Object.keys(formData).length) {
      submitHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  return (
    <div className={styles.wrapper}>
      <Tippy
        content="Found Form click here"
        delay={200}
        placement="bottom"
        theme="honeybee"
      >
        <Button onClick={onOpenModal} variant="primary" size="lg" block>
          FOUND FORM
        </Button>
      </Tippy>
      <Form open={open} onCloseModal={onCloseModal} setFormData={_formData} />
      <h2 style={{ textAlign: "center" }} className={styles.heading}>
        {Object.keys(prevFoundItems).length
          ? "LIST OF FOUND ITEMS"
          : "Fetching The Items..."}
      </h2>
      <div
        className={
          Object.keys(prevFoundItems).length
            ? styles.itemList
            : styles.emptyList
        }
      >
        {Object.keys(prevFoundItems).length ? (
          prevFoundItems.map((post, index) => (
            <ItemCard
              key={index}
              imgURL={post.foundItemImage}
              itemName={post.itemName}
              date={post.foundDate}
              itemDetails={post.foundItemDetails}
              authorName={post.name}
              authorEmail={post.email}
            />
          ))
        ) : (
          <Spinner role="grow" />
        )}
      </div>
    </div>
  );
};

export default Found;
