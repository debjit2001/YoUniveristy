import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import FoundItemsDisplay from "./FoundItemsDisplay";
import axios from "axios";
import moment from "moment";
import { IP } from "../../../IPDetails";
import styles from "../LostFoundPage.module.css";

const Found = () => {
  const [open, setOpen] = useState(false);
  const [foundEntry, setFoundEntry] = useState({
    name: "",
    email: "",
    itemName: "",
    foundDate: moment().format("YYYY-MM-DD"),
    foundItemImage: null,
    foundItemDetails: "",
  });
  const [prevFoundItems, setPrevFoundItems] = useState([]);

  // today = moment().format("DD-MM-YYYY");
  let maxDate = moment().format("YYYY-MM-DD");

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFoundEntry({ ...foundEntry, [name]: value });
  };
  const handleChange = (e) => {
    setFoundEntry({ ...foundEntry, foundItemImage: e.target.files[0] });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("email", foundEntry.email);
    fd.append("foundItemDetails", foundEntry.foundItemDetails);
    fd.append(
      "foundItemImage",
      foundEntry.foundItemImage
      // foundEntry.foundItemImage.name
    );
    fd.append("itemName", foundEntry.itemName);
    fd.append("foundDate", foundEntry.foundDate);
    fd.append("name", foundEntry.name);
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
        alert(
          "DUE TO SOME TECHNICAL ERROR YOUR FORM CANNOT BE SUBMITTED AT THE MOMENT"
        );
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
    setFoundEntry({
      name: "",
      email: "",
      itemName: "",
      foundDate: moment().format("YYYY-MM-DD"),
      foundItemImage: null,
      foundItemDetails: "",
    });
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
      <Modal open={open} onClose={onCloseModal} center>
        <form onSubmit={(e) => submitHandler(e)}>
          <h2 style={{ textAlign: "center", color: "#D2691E" }}> LOST</h2>

          <div className="name" style={{ padding: "4px" }}>
            <label htmlFor="name">Name :* </label>
            <input
              type="text"
              name="name"
              placeholder="name"
              value={foundEntry.name}
              onChange={changeHandler}
              required
            />
          </div>
          <div style={{ padding: "4px" }} className="email">
            <label htmlFor="email">Email :* </label>
            <input
              type="Email"
              name="email"
              placeholder="email"
              value={foundEntry.email}
              onChange={changeHandler}
              required
            />
          </div>

          <div className="name" style={{ padding: "4px" }}>
            <label htmlFor="ItemName">Item Name :*(within 20 letters) </label>

            <input
              type="text"
              name="itemName"
              placeholder="item Name"
              value={foundEntry.itemName}
              onChange={changeHandler}
              required
            />
          </div>

          <div style={{ padding: "4px" }} className="dateFound">
            <label htmlFor="birthday">Lost date :*</label>
            <input
              type="date"
              name="foundDate"
              placeholder="When You lost it ?"
              value={foundEntry.foundDate}
              onChange={changeHandler}
              // max={handleMaxDate}
              max={maxDate}
              required
            />
          </div>
          <div style={{ padding: "4px" }} className="details">
            <label htmlFor="img">Lost item image :*</label>
            <input
              type="file"
              id="img"
              name="foundItemImage"
              onChange={handleChange}
              accept="image/jpeg,image/png"
              required
            />
          </div>
          <div style={{ padding: "4px" }} className="details">
            <label>Lost item details :*(in brief) </label>
            <br />
            <textarea
              rows="2"
              cols="25"
              placeholder="Type lost item details"
              name="foundItemDetails"
              value={foundEntry.foundItemDetails}
              onChange={changeHandler}
              required
            ></textarea>
          </div>

          <Button type="submit">SUBMIT</Button>
          <Link to="/lost">
            <Button
              style={{
                backgroundColor: "grey",
                outline: "none",
                marginLeft: "30px",
              }}
              onClick={onCloseModal}
            >
              GO BACK
            </Button>
          </Link>
        </form>
      </Modal>
      <h2 style={{ textAlign: "center" }} className={styles.heading}>
        LOST ITEMS HERE...
      </h2>
      <br />
      <FoundItemsDisplay prevFoundItems={prevFoundItems} />
    </React.Fragment>
  );
};

export default Found;
