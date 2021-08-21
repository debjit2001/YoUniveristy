import React, { useState } from "react";

import { Modal } from "react-responsive-modal";

import styles from "./styles.module.css";

const EventCreateForm = ({ open, onCloseModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventImage, setEventImage] = useState({});

  const _onChangeHandler = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "title":
        setTitle(value.trim());
        break;
      case "description":
        setDescription(value.trim());
        break;
      case "eventImage":
        console.log(e.target);
        break;
      default:
        break;
    }
  };

  return (
    <Modal open={open} onClose={onCloseModal} center>
      <div className={styles.formContainer}>
        <div className={styles.inputDiv}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={title}
            className={styles.inputBox}
            onChange={_onChangeHandler}
          />
        </div>
        <div className={styles.inputDiv}>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            value={description}
            className={styles.inputBox}
            onChange={_onChangeHandler}
          />
        </div>
        <div className={styles.inputDiv}>
          <label htmlFor="eventImage">Upload Image</label>
          <input
            type="text"
            name="eventImage"
            value={eventImage}
            className={styles.inputBox}
            onChange={_onChangeHandler}
          />
        </div>
      </div>
    </Modal>
  );
};

export default EventCreateForm;
