import React from "react";
import "../LostFoundPage.module.css";
import styles from "../LostFoundPage.module.css";
import { Spinner } from "reactstrap";

const FoundItemDisplay = ({ prevFoundItems }) => {
  return (
    <>
      {Object.keys(prevFoundItems).length ? (
        prevFoundItems.map((post, index) => (
          <div className={styles.container} key={index}>
            <div className={styles.card}>
              <div className={styles.imgBx}>
                <img
                  src={`http://localhost:5000/${post.foundItemImage}`}
                  alt="Found Item"
                />
                <h6>{post.itemName}</h6>
                <p>{post.foundDate}</p>
              </div>
              <div className={styles.content}>
                <p>{post.foundItemDetails}</p>
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

export default FoundItemDisplay;

//
