import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import FoundItemsDisplay from "./FoundItemsDisplay";
import axios from "axios";
import { IP } from "../../../IPDetails";
import styles from "../LostFoundPage.module.css";
export default class Found extends React.Component {
  state = {
    open: false,
    foundEntry: {
      name: "",
      email: "",
      itemName: "",
      foundDate: new Date(),
      itemImg: null,
      itemDetails: "",
    },
    prevFoundItems: [],
  };

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
    currentState.itemImg = e.target.files[0];
    this.setState({ foundEntry: currentState });
  };
  handleChange = (e) => {
    const foundEntry = { ...this.state.foundEntry };
    const currentState = foundEntry;
    currentState.itemImg = e.target.files[0];
    this.setState({ foundEntry: currentState });
  };

  submitHandler = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("email", this.state.foundEntry.email);
    fd.append("foundDate", this.state.foundEntry.foundDate);
    fd.append("itemDetails", this.state.foundEntry.itemDetails);
    fd.append(
      "itemImg",
      this.state.foundEntry.itemImg,
      this.state.foundEntry.itemImg.name
    );
    fd.append("itemName", this.state.foundEntry.itemName);
    fd.append("name", this.state.foundEntry.name);
    // fd.forEach((value, key) => {
    //   console.log(key + value);
    // });
    axios
      .post(`${IP}/api/found/`, fd, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        alert("YOUR FORM IS SUCCESSFULLY SUBMITTED");
        this.setState({
          open: false,
          foundEntry: {
            name: "",
            email: "",
            itemName: "",
            foundDate: new Date(),
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
          foundEntry: {
            name: "",
            email: "",
            itemName: "",
            foundDate: new Date(),
            itemImg: "",
            itemDetails: "",
          },
        });

        alert(
          "there was some technical error , we couldnt post ur found form, please try after some time"
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
        foundDate: new Date(),
        itemImg: "",
        itemDetails: "",
      },
    });
  };
  componentDidMount() {
    axios
      .get(`${IP}/api/found`)
      .then((response) => {
        // console.log(response);
        this.setState({ prevFoundItems: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    const {
      open,
      foundEntry: { name, email, itemName, foundDate, itemDetails },
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
            <h2 style={{ textAlign: "center", color: "#D2691E" }}> FOUND</h2>

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
              <label htmlFor="ItemName">Item Name :* </label>
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
              <label htmlFor="birthday">Found date :*</label>
              <input
                type="date"
                name="foundDate"
                placeholder="yyyy-mm-dd"
                value={foundDate}
                onChange={this.changeHandler}
                required
              />
            </div>
            <div style={{ padding: "4px" }} className="details">
              <label htmlFor="img">Found item image : *</label>
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
              <label>Found item details :* </label>
              <br />
              <textarea
                rows="2"
                cols="25"
                placeholder="Type found item details"
                name="itemDetails"
                value={itemDetails}
                onChange={this.changeHandler}
                required
              ></textarea>
            </div>

            <Button type="submit">SUBMIT</Button>
            <Link to="/found">
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
          FOUND ITEMS HERE...
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
