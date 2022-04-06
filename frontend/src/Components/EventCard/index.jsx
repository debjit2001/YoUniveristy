//Third party import
import React from "react";
import Tippy from "@tippy.js/react";
import Loader from "react-loader-spinner";
//Stylesheet import
import styles from "./style.module.css";
import ImageWrapper from "Components/Image-Wrapper";

const EventCard = ({ eve, index, _onEventClick }) => {
  

  return (
    <div className={styles.EventInfo}>
    
      <ImageWrapper
       imgSrc={eve.eventImage}
       imgAlt="eventPic"
       idName={index}
       loader={
        <span className={styles.Loader}>
        <Loader type="Hearts" color="#4CAF50" height={100} width={100} />
      </span>
       }
       onClickHandler={(e) => _onEventClick(e)}
    
       
      />
      
      <div>
        <Tippy
          content="click here for details"
          delay={200}
          placement="bottom"
          theme="honeybee"
        >
          <p id={index} onClick={(e) => _onEventClick(e)}>
            {eve.title}
          </p>
        </Tippy>
      </div>
    </div>
  );
};

export default EventCard;
