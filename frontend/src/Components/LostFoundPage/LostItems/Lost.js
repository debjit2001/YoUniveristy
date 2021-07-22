import React, { Fragment, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "react-responsive-modal/styles.css";
import LostItemsDisplay from "./LostItemsDisplay";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import axios from "axios";
import { IP } from "../../../IPDetails";
import styles from "../LostFoundPage.module.css";
import Form from "../Form";

const Lost = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [prevLostItems, setPrevLostItems] = useState([]);

  const submitHandler = () => {
    const fd = new FormData();
    fd.append("email", formData.email);
    fd.append("lostItemDetails", formData.ItemDetails);
    fd.append("lostItemImage", formData.ItemImage);
    fd.append("itemName", formData.itemName);
    fd.append("lostDate", formData.date);
    fd.append("name", formData.name);
    axios
      .post(`${IP}/lost`, fd, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert("YOUR FORM IS SUCCESSFULLY SUBMITTED");
        onCloseModal();
        _fetchNewLostHandler();
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

  const _fetchNewLostHandler = () => {
    axios
      .get(`${IP}/lost`)
      .then((response) => {
        setPrevLostItems(response.data.lostItems);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    _fetchNewLostHandler();
  }, []);

  useEffect(() => {
    if (formData !== null && Object.keys(formData).length) {
      submitHandler();
    }
  }, [formData]);

  return (
    <Fragment>
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
      <Form open={open} onCloseModal={onCloseModal} setFormData={setFormData} />
      <h2 style={{ textAlign: "center" }} className={styles.heading}>
        LOST ITEMS HERE...
      </h2>
      <br />
      <LostItemsDisplay lostItems={prevLostItems} />
    </Fragment>
  );
};

export default Lost;
