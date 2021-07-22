import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import moment from "moment";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Form = ({ open, onCloseModal, setFormData }) => {
  const [entry, setEntry] = useState({
    name: "",
    email: "",
    itemName: "",
    date: moment().format("YYYY-MM-DD"),
    ItemImage: null,
    ItemDetails: "",
  });
  let maxDate = moment().format("YYYY-MM-DD");

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setEntry({ ...entry, [name]: value });
  };

  const imageInputHandler = (e) => {
    setEntry({ ...entry, ItemImage: e.target.files[0] });
  };

  return (
    <Modal open={open} onClose={onCloseModal} center>
      <form onSubmit={() => setFormData(entry)}>
        <h2 style={{ textAlign: "center", color: "#D2691E" }}> </h2>

        <div className="name" style={{ padding: "4px" }}>
          <label htmlFor="name">
            Name :<sup>*</sup>{" "}
          </label>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={entry.name}
            onChange={(e) => onChangeHandler(e)}
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
            value={entry.email}
            onChange={(e) => onChangeHandler(e)}
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
            value={entry.itemName}
            onChange={(e) => onChangeHandler(e)}
            required
          />
        </div>

        <div style={{ padding: "4px" }} className="dateFound">
          <label htmlFor="birthday">
            date :<sup>*</sup>
          </label>
          <input
            type="date"
            name="date"
            placeholder="When You  it ?"
            value={entry.date}
            onChange={(e) => onChangeHandler(e)}
            max={maxDate}
            required
          />
        </div>
        <div style={{ padding: "4px" }} className="details">
          <label htmlFor="img">
            item image :<sup>*</sup>
          </label>
          <input
            type="file"
            id="img"
            name="ItemImage"
            onChange={imageInputHandler}
            accept="image/jpeg,image/png"
            required
          />
        </div>
        <div style={{ padding: "4px" }} className="details">
          <label>
            item details :<sup>*</sup>(in brief){" "}
          </label>
          <br />
          <textarea
            rows="2"
            cols="25"
            placeholder="Type  item details"
            name="ItemDetails"
            value={entry.ItemDetails}
            onChange={(e) => onChangeHandler(e)}
            required
          ></textarea>
        </div>

        <Button type="submit">SUBMIT</Button>
        <Link to="/">
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
  );
};

export default Form;
