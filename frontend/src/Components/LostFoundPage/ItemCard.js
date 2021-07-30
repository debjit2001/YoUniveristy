import React from "react";
import styles from "./LostFoundPage.module.css";
const ItemCard = ({
  imgURL,
  itemName,
  date,
  itemDetails,
  authorName,
  authorEmail,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardImageBox}>
        <img src={`http://localhost:5000/${imgURL}`} alt="lost item" />
        <h6>{itemName}</h6>
        <p>{date}</p>
      </div>
      <div className={styles.content}>
        <p>{itemDetails}</p>
        <p style={{ color: "#000" }}>contact to:</p>
        <p>{authorName}</p>
        <p>{authorEmail}</p>
      </div>
    </div>
  );
};

export default ItemCard;
