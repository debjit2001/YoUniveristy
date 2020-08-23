import React from "react";
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

export default class Lost extends React.Component {
  state = {
    open: false,
    lostEntry: {
      name: "",
      email: "",
      itemName: "",
      lostDate: moment().format("YYYY-MM-DD"),
      lostItemImage: null,
      lostItemDetails: "",
    },
    prevLostItems: [],
  };

  // today = moment().format("DD-MM-YYYY");
  maxDate = moment().format("YYYY-MM-DD");

  changeHandler = (e) => {
    const { lostEntry } = { ...this.state };
    const currentState = lostEntry;
    const { name, value } = e.target;
    currentState[name] = value;
    this.setState({ lostEntry: currentState });
  };
  handleChange = (e) => {
    const lostEntry = { ...this.state.lostEntry };
    const currentState = lostEntry;
    currentState.lostItemImage = e.target.files[0];
    this.setState({ lostEntry: currentState });
  };
  submitHandler = (e) => {
    e.preventDefault();
    const { lostEntry } = this.state;
    const fd = new FormData();
    fd.append("email", lostEntry.email);
    fd.append("lostItemDetails", lostEntry.lostItemDetails);
    fd.append(
      "lostItemImage",
      lostEntry.lostItemImage
      // lostEntry.lostItemImage.name
    );
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
        console.log(response);
        alert("YOUR FORM IS SUCCESSFULLY SUBMITTED");
        this.setState(
          {
            open: false,
            lostEntry: {
              name: "",
              email: "",
              itemName: "",
              lostDate: this.maxDate,
              lostItemImage: "",
              lostItemDetails: "",
            },
          },
          () => this._fetchNewLostHandler()
        );
      })
      .catch((error) => {
        alert(
          "DUE TO SOME TECHNICAL ERROR YOUR FORM CANNOT BE SUBMITTED AT THE MOMENT"
        );
        this.setState({
          open: false,
          lostEntry: {
            name: "",
            email: "",
            itemName: "",
            lostDate: this.maxDate,
            lostItemImage: "",
            lostItemDetails: "",
          },
        });

        alert(
          "there was some technical error , we couldnt post ur lost form, please try after some time"
        );
      });
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({
      open: false,
      lostEntry: {
        name: "",
        email: "",
        itemName: "",
        lostDate: this.maxDate,
        lostItemImage: "",
        lostItemDetails: "",
      },
    });
  };

  _fetchNewLostHandler = () => {
    axios
      .get(`${IP}/lost`)
      .then((response) => {
        console.log(response);
        this.setState({ prevLostItems: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentDidMount() {
    this._fetchNewLostHandler();
  }
  render() {
    const {
      open,
      lostEntry: { name, email, itemName, lostDate, lostItemDetails },
      prevLostItems,
    } = this.state;
    return (
      <React.Fragment>
        <Tippy
          content="Lost Form click here"
          delay={200}
          placement="bottom"
          theme="honeybee"
        >
          <Button onClick={this.onOpenModal} variant="primary" size="lg" block>
            LOST FORM
          </Button>
        </Tippy>
        <Modal open={open} onClose={this.onCloseModal} center>
          <form onSubmit={(e) => this.submitHandler(e)}>
            <h2 style={{ textAlign: "center", color: "#D2691E" }}> LOST</h2>

            <div className="name" style={{ padding: "4px" }}>
              <label htmlFor="name">Name :* </label>
              <input
                type="text"
                name="name"
                placeholder="name"
                value={name}
                onChange={this.changeHandler}
                required
              />
            </div>
            <div style={{ padding: "4px" }} className="email">
              <label htmlFor="email">Email :* </label>
              <input
                type="Email"
                name="email"
                placeholder="email"
                value={email}
                onChange={this.changeHandler}
                required
              />
            </div>

            <div className="name" style={{ padding: "4px" }}>
              <label htmlFor="ItemName">Item Name :*(within 20 letters) </label>

              <input
                type="text"
                name="itemName"
                placeholder="item Name"
                value={itemName}
                onChange={this.changeHandler}
                required
              />
            </div>

            <div style={{ padding: "4px" }} className="dateFound">
              <label htmlFor="birthday">Lost date :*</label>
              <input
                type="date"
                name="lostDate"
                placeholder="When You lost it ?"
                value={lostDate}
                onChange={this.changeHandler}
                // max={this.handleMaxDate}
                max={this.maxDate}
                required
              />
            </div>
            <div style={{ padding: "4px" }} className="details">
              <label htmlFor="img">Lost item image :*</label>
              <input
                type="file"
                id="img"
                name="lostItemImage"
                onChange={this.handleChange}
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
                name="lostItemDetails"
                value={lostItemDetails}
                onChange={this.changeHandler}
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
                onClick={this.onCloseModal}
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
        <LostItemsDisplay
          key={this.state.prevLostItems.id}
          prevLostItems={this.state.prevLostItems}
        />
      </React.Fragment>
    );
  }
}
