import React, { useState, createRef } from "react";

import { Modal } from "react-responsive-modal";

import styles from "./styles.module.css";

const EventCreateForm = ({ open, onCloseModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventImage, setEventImage] = useState({});
  const fileInputRef = createRef();
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
        setEventImage(e.target.files[0]);
        break;
      default:
        break;
    }
  };

  const _onClickHandler = () => {
    fileInputRef.current.click();
  };

  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      classNames={{ modal: styles.Modal }}
      center
    >
      <div className={styles.formContainer}>
        <div className={styles.inputDiv}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={title}
            className={styles.inputBox}
            onChange={_onChangeHandler}
            placeholder="Enter the title..."
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
            placeholder="Give a brief description..."
          />
        </div>
        <div className={styles.inputDiv}>
          <label htmlFor="eventImage">Upload Image</label>
          <button className={styles.fileInputButton} onClick={_onClickHandler}>
            <p>Attach Image</p>
            <img src="/assets/icons/attachment.svg" alt="attach file" />
          </button>
          <p className={styles.fileName}>{eventImage?.name}</p>
          <input
            type="file"
            name="eventImage"
            // value={eventImage}
            accept="image/*"
            ref={fileInputRef}
            className={`${styles.inputBox} ${styles.fileInput}`}
            onChange={_onChangeHandler}
          />
        </div>
        <button className={styles.submitButton}>Create Event</button>
      </div>
    </Modal>
  );
};

export default EventCreateForm;
