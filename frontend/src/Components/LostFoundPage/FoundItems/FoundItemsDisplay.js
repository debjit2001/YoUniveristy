import React from "react";
import styles from "../LostFoundPage.module.css";
import { Spinner } from "reactstrap";
import ItemCard from "../ItemCard";

const FoundItemDisplay = ({ prevFoundItems }) => {
  return (
    <>
      {Object.keys(prevFoundItems).length ? (
        prevFoundItems.map((post, index) => (
          <ItemCard
            key={index}
            imgURL={post.foundItemImage}
            itemName={post.itemName}
            date={post.foundDate}
            itemDetails={post.foundItemDetails}
            authorName={post.name}
            authorEmail={post.email}
          />
        ))
      ) : (
        <Spinner role="grow" />
      )}
    </>
  );
};

export default FoundItemDisplay;
