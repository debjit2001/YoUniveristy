import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import LostItemsDisplay from "./LostItemsDisplay";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import axios from "axios";
import { IP } from "../../../IPDetails";
import moment from "moment";
import styles from "../LostFoundPage.module.css";

const Lost = () => {
  const [open, setOpen] = useState(false);
  const [lostEntry, setLostEntry] = useState({
    name: "",
    email: "",
    itemName: "",
    lostDate: moment().format("YYYY-MM-DD"),
    lostItemImage: null,
    lostItemDetails: "",
  });
  const [prevLostItems, setPrevLostItems] = useState([]);

  // today = moment().format("DD-MM-YYYY");
  let maxDate = moment().format("YYYY-MM-DD");

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLostEntry({ ...lostEntry, [name]: value });
  };

  const imageInputHandler = (e) => {
    const currentState = lostEntry;
    currentState.lostItemImage = e.target.files[0];
    setLostEntry(currentState);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("email", lostEntry.email);
    fd.append("lostItemDetails", lostEntry.lostItemDetails);
    fd.append("lostItemImage", lostEntry.lostItemImage);
    fd.append("itemName", lostEntry.itemName);
    fd.append("lostDate", lostEntry.lostDate);
    fd.append("name", lostEntry.name);
    axios
      .post(`${IP}/lost`, fd, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert("YOUR FORM IS SUCCESSFULLY SUBMITTED");
        setOpen(false);
        setLostEntry({
          name: "",
          email: "",
          itemName: "",
          lostDate: maxDate,
          lostItemImage: "",
          lostItemDetails: "",
        });
        _fetchNewLostHandler();
      })
      .catch((error) => {
        alert(
          "DUE TO SOME TECHNICAL ERROR YOUR FORM CANNOT BE SUBMITTED AT THE MOMENT"
        );
        setOpen(false);
        setLostEntry({
          name: "",
          email: "",
          itemName: "",
          lostDate: maxDate,
          lostItemImage: "",
          lostItemDetails: "",
        });
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
    setLostEntry({
      name: "",
      email: "",
      itemName: "",
      lostDate: maxDate,
      lostItemImage: "",
      lostItemDetails: "",
    });
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
      <Modal open={open} onClose={onCloseModal} center>
        <form onSubmit={(e) => submitHandler(e)}>
          <h2 style={{ textAlign: "center", color: "#D2691E" }}> LOST</h2>

          <div className="name" style={{ padding: "4px" }}>
            <label htmlFor="name">
              Name :<sup>*</sup>{" "}
            </label>
            <input
              type="text"
              name="name"
              placeholder="name"
              value={lostEntry.name}
              onChange={(e) => changeHandler(e)}
              required
            />
          </div>
          <div style={{ padding: "4px" }} className="email">
            <label htmlFor="email">
              Email ::<sup>*</sup>{" "}
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              value={lostEntry.email}
              onChange={(e) => changeHandler(e)}
              required
            />
          </div>

          <div className="name" style={{ padding: "4px" }}>
            <label htmlFor="ItemName">
              Item Name::<sup>*</sup>(within 20 letters){" "}
            </label>

            <input
              type="text"
              name="itemName"
              placeholder="item Name"
              value={lostEntry.itemName}
              onChange={(e) => changeHandler(e)}
              required
            />
          </div>

          <div style={{ padding: "4px" }} className="dateFound">
            <label htmlFor="birthday">
              Lost date :<sup>*</sup>
            </label>
            <input
              type="date"
              name="lostDate"
              placeholder="When You lost it ?"
              value={lostEntry.lostDate}
              onChange={(e) => changeHandler(e)}
              max={maxDate}
              required
            />
          </div>
          <div style={{ padding: "4px" }} className="details">
            <label htmlFor="img">
              Lost item image :<sup>*</sup>
            </label>
            <input
              type="file"
              id="img"
              name="lostItemImage"
              onChange={imageInputHandler}
              accept="image/jpeg,image/png"
              required
            />
          </div>
          <div style={{ padding: "4px" }} className="details">
            <label>
              Lost item details :<sup>*</sup>(in brief){" "}
            </label>
            <br />
            <textarea
              rows="2"
              cols="25"
              placeholder="Type lost item details"
              name="lostItemDetails"
              value={lostEntry.lostItemDetails}
              onChange={(e) => changeHandler(e)}
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
      <LostItemsDisplay lostItems={prevLostItems} />
    </Fragment>
  );
};

export default Lost;
