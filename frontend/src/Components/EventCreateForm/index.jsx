//Third party import
import React, { useState, createRef } from "react";
import axios from "axios";
import { Modal } from "react-responsive-modal";
//Stylesheet import
import styles from "./styles.module.css";
//Local import
import { IP } from "IPDetails";
import Loading from "Components/Loading";
import ImageWrapper from "Components/Image-Wrapper";

const EventCreateForm = ({
  open,
  onCloseModal,
  setEventCreationFlag,
  setIsEventCreationFailed,
}) => {
  //state declaration
  const [title, _title] = useState("");
  const [description, _description] = useState("");
  const [eventImage, _eventImage] = useState({});
  const [isLoading, _isLoading] = useState(false);
  //ref creation for file input for event-image
  const fileInputRef = createRef();
  //method declarations
  /**
   * @DESC: handler for change event on event create form
   * @param {*} event
   */
  const _onChangeHandler = (event) => {
    const { name, value } = event?.target;

    switch (name) {
      case "title":
        _title((prev) => (prev = value));
        break;
      case "description":
        _description((prev) => (prev = value));
        break;
      case "eventImage":
        _eventImage((prev) => (prev = event?.target?.files[0]));
        break;
      default:
        break;
    }
  };
  /**
   * @DESC: click handler for file input button
   */
  const _onClickHandler = () => {
    fileInputRef.current.click();
  };
  /**
   * @DESC: handler for submitting the form
   */
  const submitBtnHandler = async () => {
    _isLoading((prev) => (prev = true));
    const newEvent = new FormData();
    newEvent.append("title", title);
    newEvent.append("desc", description);
    newEvent.append("eventImage", eventImage);

    try {
      const response = await axios.post(`${IP}/event/`, newEvent, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      _isLoading((prev) => (prev = false));
      if (!response.hasOwnProperty("error")) {
        setEventCreationFlag(true);
        onCloseModal();
      }
    } catch (err) {
      _isLoading(false);
      setIsEventCreationFailed({
        status: true,
        message: `${err.response.data.message}: ${err.response.data.error}`,
      });
      onCloseModal();
    }
  };
  /**
   * @DESC: handler for closing of loading modal
   */
  const closeEventCrateForm = () => {
    console.log("Close button Clicked");
  };

  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      classNames={{ modal: styles.Modal }}
      center
    >
      {isLoading && (
        <Modal
          open={isLoading}
          classNames={{ modal: styles.LoaderModal }}
          onClose={closeEventCrateForm}
          center
        >
          <Loading loading={isLoading} />
        </Modal>
      )}
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
            required
            disabled={isLoading}
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
            required
            disabled={isLoading}
          />
        </div>
        <div className={styles.inputDiv}>
          <label htmlFor="eventImage">Upload Image</label>
          <button
            className={styles.fileInputButton}
            onClick={_onClickHandler}
            disabled={isLoading}
          >
            <p>Attach Image</p>
            {/* <img src="/assets/icons/attachment.svg" alt="attach file" /> */}
            <ImageWrapper className={styles.image} imgSrc="/assets/icons/attachment.svg" imgAlt="attach file" />
          </button>
          <p className={styles.fileName}>{eventImage?.name}</p>
          <input
            type="file"
            name="eventImage"
            accept="image/*"
            ref={fileInputRef}
            className={`${styles.inputBox} ${styles.fileInput}`}
            onChange={_onChangeHandler}
            disabled={isLoading}
          />
        </div>
        <button
          className={styles.submitButton}
          onClick={submitBtnHandler}
          disabled={isLoading}
        >
          Create Event
        </button>
      </div>
    </Modal>
  );
};

export default EventCreateForm;
