import React from "react";
import { Spinner } from "reactstrap";
import ItemCard from "../ItemCard";

const LostItemsDisplay = ({ lostItems }) => {
  return (
    <>
      {Object.keys(lostItems).length ? (
        lostItems.map((post, index) => (
          <ItemCard
            key={index}
            imgURL={post.lostItemImage}
            itemName={post.itemName}
            date={post.lostDate}
            itemDetails={post.lostIemDetails}
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

export default LostItemsDisplay;

//
