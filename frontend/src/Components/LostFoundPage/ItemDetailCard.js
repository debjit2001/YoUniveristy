import React from "react";
import { useState } from "react";
import { Modal } from "react-responsive-modal";
import styles from "./LostFoundPage.module.css";
const ItemDetailCard = ({
  open,
  onCloseModal,
  imgURL,
  itemName,
  date,
  itemDetails,
  authorName,
  authorEmail,
}) => {
    
  const [readMore, setReadMore] = useState(false);
  const onReadMore=()=>{
      setReadMore(true)
  }
  const onReadLess=()=>{
      setReadMore(false);
  }
  return (
    <Modal open={open} onClose={onCloseModal} center>
      <div style={{ width: "450px", cursor: "initial" }}>
        <div
          className={styles.cardImageBox}
          style={{ textAlign: "center", cursor: "initial" }}
        >
          <img
            src={`http://localhost:5000/${imgURL}`}
            alt="lost item"
            style={{
              marginTop: "28px",
              maxWidth: "500px",
              marginBottom: "25px",
              cursor: "initial",
            }}
          />
          <p style={{ color: "#000", fontSize: "26px", fontWeight: "bold" }}>
            Item Info
          </p>
          <div>
            <label>Item Name : </label>
            <h6>{itemName}</h6>
          </div>
          <div>
            <label>Date : </label>
            <p>{date}</p>
          </div>
        </div>
        <div className={styles.content} style={{ textAlign: "center" }}>
          <div className={`${styles.itemDetails}`}>
            <label>Item Details : </label>
            {
              itemDetails.length>25?!readMore?<div className={`${styles.itemDesc}`}>
                <p>
                  {itemDetails.substring(0, 25)}
                  <span>...</span>
                </p>
                <p className={`${styles.readMore}`} onClick={onReadMore}>Read More</p>
              </div>:<div className={`${styles.itemDesc}`}>
              <p>
                {itemDetails}
                
              </p>
              <p className={`${styles.readMore}`} onClick={onReadLess}>Read Less</p>
            </div>:<div className={`${styles.itemDesc}`}>
              <p>
                {itemDetails}
              </p>
            </div>
            }
          </div>

          <p style={{ color: "#000", fontSize: "26px", fontWeight: "bold" }}>
            Contact Info
          </p>
          <div>
            <label>Author Name : </label>
            <p>{authorName}</p>
          </div>
          <div>
            <label>Author Email : </label>
            <p>{authorEmail}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ItemDetailCard;
