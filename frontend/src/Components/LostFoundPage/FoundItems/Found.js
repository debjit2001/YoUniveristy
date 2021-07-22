import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "react-responsive-modal/styles.css";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import FoundItemsDisplay from "./FoundItemsDisplay";
import axios from "axios";
import { IP } from "../../../IPDetails";
import styles from "../LostFoundPage.module.css";
import Form from "../Form";

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
    <React.Fragment>
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
        FOUND ITEMS HERE...
      </h2>
      <br />
      <FoundItemsDisplay prevFoundItems={prevFoundItems} />
    </React.Fragment>
  );
};

export default Found;
