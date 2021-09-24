import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
//import styles from "./HomePage.module.css";
// import DarkMode from "./DarkMode";

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div
      id="carouselExampleSlidesOnly"
      className="carousel slide"
      data-ride="carousel"
    >
      {loading ? (
        <Spinner animation="grow" role="status" />
      ) : (
        <>
          <ol class="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="0"
              class="active"
            ></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
          </ol>
          <div className="carousel-inner" style={{ height: "88vh" }}>
            <div className="carousel-item active">
              <img
                className="d-block w-100 h-50"
                src="https://source.unsplash.com/2400x1300/?students"
                alt="First slide"
                style={{ opacity: "0.8" }}
              ></img>
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100 h-50"
                src="https://source.unsplash.com/2400x1300/?university,lost"
                alt="Second slide"
                style={{ opacity: "0.8" }}
              ></img>
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100 h-50"
                src="https://source.unsplash.com/2400x1300/?food"
                alt="Third slide"
                style={{ opacity: "0.8" }}
              ></img>
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100 h-50"
                src="https://source.unsplash.com/2400x1300/?cultural"
                alt="Forth slide"
                style={{ opacity: "0.8" }}
              ></img>
            </div>
            <a
              class="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
            </a>
            <a
              class="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
                opacity="1"
              ></span>
            </a>
          </div>
        </>
      )}
    </div>
  );
};
export default HomePage;
