import React from "react";
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

export default class Lost extends React.Component {
  state = {
    open: false,
    foundEntry: {
      name: "",
      email: "",
      itemName: "",
      foundDate: moment().format("YYYY-MM-DD"),
      foundItemImage: null,
      foundItemDetails: "",
    },
    prevFoundItems: [],
  };

  // today = moment().format("DD-MM-YYYY");
  maxDate = moment().format("YYYY-MM-DD");

  changeHandler = (e) => {
    const { foundEntry } = { ...this.state };
    const currentState = foundEntry;
    const { name, value } = e.target;
    currentState[name] = value;
    this.setState({ foundEntry: currentState });
  };
  handleChange = (e) => {
    const foundEntry = { ...this.state.foundEntry };
    const currentState = foundEntry;
    currentState.foundItemImage = e.target.files[0];
    this.setState({ foundEntry: currentState });
  };
  submitHandler = (e) => {
    e.preventDefault();
    const { foundEntry } = this.state;
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
        this.setState(
          {
            open: false,
            foundEntry: {
              name: "",
              email: "",
              itemName: "",
              foundDate: this.maxDate,
              foundItemImage: "",
              foundItemDetails: "",
            },
          },
          () => this._fetchNewFoundHandler()
        );
      })
      .catch((error) => {
        alert(
          "DUE TO SOME TECHNICAL ERROR YOUR FORM CANNOT BE SUBMITTED AT THE MOMENT"
        );
        this.setState({
          open: false,
          foundEntry: {
            name: "",
            email: "",
            itemName: "",
            foundDate: this.maxDate,
            foundItemImage: "",
            foundItemDetails: "",
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
      foundEntry: {
        name: "",
        email: "",
        itemName: "",
        foundDate: this.maxDate,
        foundItemImage: "",
        foundItemDetails: "",
      },
    });
  };

  _fetchNewFoundHandler = () => {
    axios
      .get(`${IP}/found`)
      .then((response) => {
        console.log(response);
        this.setState({ prevFoundItems: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentDidMount() {
    this._fetchNewFoundHandler();
  }
  render() {
    const {
      open,
      foundEntry: { name, email, itemName, foundDate, foundItemDetails },
      prevFoundItems,
    } = this.state;
    return (
      <React.Fragment>
        <Tippy
          content="Found Form click here"
          delay={200}
          placement="bottom"
          theme="honeybee"
        >
          <Button onClick={this.onOpenModal} variant="primary" size="lg" block>
            FOUND FORM
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
                name="foundDate"
                placeholder="When You lost it ?"
                value={foundDate}
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
                name="foundItemImage"
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
                name="foundItemDetails"
                value={foundItemDetails}
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
        <FoundItemsDisplay
          key={this.state.prevFoundItems.id}
          prevFoundItems={this.state.prevFoundItems}
        />
      </React.Fragment>
    );
  }
}
