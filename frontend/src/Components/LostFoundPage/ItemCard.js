import React, { useState } from "react";
import styles from "./LostFoundPage.module.css";
import ItemDetailCard from "./ItemDetailCard";
const ItemCard = ({
  imgURL,
  itemName,
  date,
  itemDetails,
  authorName,
  authorEmail,
}) => {
  /**
   * State declaration
   **/
   const [open, _open] = useState(false);
  //Function to change the state of the modal from close to open
  const onOpenModal = () => {
    _open((prev) => (prev = true));
  };
  //Function to change the state of the modal from open to close
  const onCloseModal = () => {
    _open((prev) => (prev = false));
  };
  return (
    <>
    <div className={styles.card} onClick={onOpenModal} variant="primary" size="lg" block>
      <div className={styles.cardImageBox}>
        <img src={`http://localhost:5000/${imgURL}`} alt="lost item" />
        <div>
          <label>Item Name : </label>
          <h6>{itemName}</h6>
        </div>
        
      </div>
      <div className={styles.content}>
       
      <div>
          <label>Contact to : </label>
          <p>{authorName}</p>
        </div>
        
      </div>
    </div>
     <ItemDetailCard open={open} onCloseModal={onCloseModal}  
      imgURL={imgURL}
      itemName={itemName}
      date={date}
      itemDetails={itemDetails}
      authorName={authorName}
      authorEmail={authorEmail}
     />
     </>
  );
};

export default ItemCard;
