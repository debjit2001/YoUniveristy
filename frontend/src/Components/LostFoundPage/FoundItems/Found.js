import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "react-responsive-modal/styles.css";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import axios from "axios";
import { Spinner } from "reactstrap";
import { IP } from "../../../IPDetails";
import styles from "../LostFoundPage.module.css";
import Form from "../Form";
import ItemCard from "../ItemCard";

const Found = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [prevFoundItems, setPrevFoundItems] = useState([]);

  const submitHandler = () => {
    const fd = new FormData();
    fd.append("email", formData.email);
    fd.append("foundItemDetails", formData.foundItemDetails);
    fd.append("foundItemImage", formData.foundItemImage);
    fd.append("itemName", formData.itemName);
    fd.append("foundDate", formData.foundDate);
    fd.append("name", formData.name);
    axios
      .post(`${IP}/found`, fd, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        alert("YOUR FORM IS SUCCESSFULLY SUBMITTED");
        onCloseModal();
        _fetchNewFoundHandler();
      })
      .catch((error) => {
        onCloseModal();
        alert(
          "there was some technical error , we couldnt post ur lost form, please try after some time"
        );
      });
  };

  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
    setFormData(null);
  };

  const _fetchNewFoundHandler = () => {
    axios
      .get(`${IP}/found`)
      .then((response) => {
        console.log(
          "🚀 ~ file: Found.js ~ line 93 ~ .then ~ response",
          response
        );
        setPrevFoundItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    _fetchNewFoundHandler();
  }, []);

  useEffect(() => {
    if (formData !== null && Object.keys(formData).length) {
      submitHandler();
    }
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
      <Form open={open} onCloseModal={onCloseModal} setFormData={setFormData} />
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
