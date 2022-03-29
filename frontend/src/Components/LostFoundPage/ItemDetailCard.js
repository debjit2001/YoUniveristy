import React from "react";
import { useState } from "react";
import { Modal } from "react-responsive-modal";
import ImageWrapper from "Components/Image-Wrapper";
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
  /** 
   * State Declarations
  */
  const [readMore, setReadMore] = useState(false);
  /**
   * Function to activate readMore state
   */
  const onReadMore=()=>{
      setReadMore((prev)=>prev=true)
  }
  /**
   * Function to deactivate readMore state
   */
  const onReadLess=()=>{
      setReadMore((prev)=>prev=false);
  }
  /**
   * @desc method to get the correct imgURL to support both multer and cloudinary configuration
   * @returns modified imgURL
   */
  const _getImageSource = () => {
    if (imgURL.indexOf("dboyols2t") !== -1) {
      return imgURL;
    } else return `http://localhost:5000/${imgURL}`;
  };
  return (
    <Modal open={open} onClose={onCloseModal} center>
      <div style={{ width: "450px", cursor: "initial" }}>
        <div
          className={styles.cardImageBox}
          style={{ textAlign: "center", cursor: "initial" }}
        >
         
          <ImageWrapper
       imgSrc={_getImageSource()}
       imgAlt="lost item"
       className={styles.img2}
     
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
