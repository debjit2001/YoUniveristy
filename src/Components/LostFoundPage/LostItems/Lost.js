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
import styles from "../LostFoundPage.module.css";

export default class Lost extends React.Component {
  state = {
    open: false,
    lostEntry: {
      name: "",
      email: "",
      itemName: "",
      lostDate: new Date(),
      itemImg: null,
      itemDetails: "",
    },
    prevLostItems: [],
  };

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
    currentState.itemImg = e.target.files[0];
    this.setState({ lostEntry: currentState });
  };
  submitHandler = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("email", this.state.lostEntry.email);
    fd.append("itemDetails", this.state.lostEntry.itemDetails);
    fd.append(
      "itemImg",
      this.state.lostEntry.itemImg,
      this.state.lostEntry.itemImg.name
    );
    fd.append("itemName", this.state.lostEntry.itemName);
    fd.append("lostDate", this.state.lostEntry.lostDate);
    fd.append("name", this.state.lostEntry.name);
    axios
      .post(`${IP}/api/lost/`, fd, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        alert("YOUR FORM IS SUCCESSFULLY SUBMITTED");
        this.setState({
          open: false,
          lostEntry: {
            name: "",
            email: "",
            itemName: "",
            lostDate: new Date(),
            itemImg: "",
            itemDetails: "",
          },
        });
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
            lostDate: new Date(),
            itemImg: "",
            itemDetails: "",
          },
        });

        alert(
          "there was some technical error , we couldnt post ur lost form, please try after some time"
        );
      });
  };
  handleMaxDate() {
    let today = new Date(),
      day = today.getDate(),
      month = today.getMonth() + 1, //January is 0
      year = today.getFullYear();
    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }
    today = year + "-" + month + "-" + day;
    console.log(today);
  }

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
        lostDate: new Date(),
        itemImg: "",
        itemDetails: "",
      },
    });
  };
  // max={moment().add(5, 'days').format("YYYY-MM-DD")
  componentDidMount() {
    axios
      .get(`${IP}/api/lost`)
      .then((response) => {
        // console.log(response);
        this.setState({ prevLostItems: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    const {
      open,
      lostEntry: { name, email, itemName, lostDate, itemDetails },
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
                placeholder="yyyy-mm-dd"
                value={lostDate}
                onChange={this.changeHandler}
                // max={this.handleMaxDate}
                required
              />
            </div>
            <div style={{ padding: "4px" }} className="details">
              <label htmlFor="img">Lost item image :*</label>
              <input
                type="file"
                id="img"
                name="itemImg"
                onChange={this.handleChange}
                accept="image/*"
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
                name="itemDetails"
                value={itemDetails}
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
