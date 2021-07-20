import React from "react";
import "../LostFoundPage.module.css";
import styles from "../LostFoundPage.module.css";
import { Spinner } from "reactstrap";

const LostItemsDisplay = ({ lostItems }) => {
  return (
    <>
      {Object.keys(lostItems).length ? (
        lostItems.map((post, index) => (
          <div className={styles.container} key={index}>
            <div className={styles.card} key={post.id}>
              <div className={styles.imgBx}>
                <img
                  src={
                    `http://localhost:5000/${post.lostItemImage}` ||
                    "https://logo.clearbit.com/google.com"
                  }
                  alt="lost item"
                />
                <h6>{post.itemName}</h6>
                <p>{post.lostDate}</p>
              </div>
              <div className={styles.content}>
                <p>{post.lostItemDetails}</p>
                <p style={{ color: "#000" }}>contact to:</p>
                <p>{post.name}</p>
                <p>{post.email}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <Spinner role="grow" />
      )}
    </>
  );
};

export default LostItemsDisplay;

//
