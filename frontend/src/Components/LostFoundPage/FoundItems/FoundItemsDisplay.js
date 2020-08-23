import React from "react";
import "../LostFoundPage.module.css";
import styles from "../LostFoundPage.module.css";
import { Spinner } from "reactstrap";

export default class FoundItemsDisplay extends React.Component {
  render() {
    return (
      <>
        {this.props.prevFoundItems.length ? (
          this.props.prevFoundItems.map((post) => (
            <div className={styles.container} key={post.id}>
              <div className={styles.card} key={post.id}>
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
  }
}

//
