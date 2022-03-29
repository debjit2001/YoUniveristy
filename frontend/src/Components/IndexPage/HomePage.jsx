import ImageWrapper from "Components/Image-Wrapper";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import styles from "./HomePage.module.css";
// import DarkMode from "./DarkMode";

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
      {loading ?(<Spinner animation="grow" role="status"/>):
      (<div className="carousel-inner" style={{height:"88vh"}}>
        <div className="carousel-item active">
          {/* <img className="d-block w-100 h-50" src="https://source.unsplash.com/2400x1300/?students" alt="First slide"></img> */}
          <ImageWrapper className="d-block w-100 h-50" imgSrc="https://source.unsplash.com/2400x1300/?students" imgAlt="First slide"/>
        </div>
        <div className="carousel-item">
          {/* <img className="d-block w-100 h-50" src="https://source.unsplash.com/2400x1300/?university" alt="Second slide"></img> */}
          <ImageWrapper className="d-block w-100 h-50" imgSrc="https://source.unsplash.com/2400x1300/?university" imgAlt="Second slide"/>
        </div>
        <div className="carousel-item">
          {/* <img className="d-block w-100 h-50" src="https://source.unsplash.com/2400x1300/?colleges" alt="Third slide"></img> */}
          <ImageWrapper className="d-block w-100 h-50" imgSrc="https://source.unsplash.com/2400x1300/?colleges" imgAlt="Third slide"/>
        </div>
      </div>
      )}
    </div>
  );
};
export default HomePage;
