import React, { Component } from "react";
import { Spinner } from "react-bootstrap";
import styles from "./HomePage.module.css";
import DarkMode from "./DarkMode";

class HomePage extends Component {
  state = { loading: true };

  renderSpinner = () => {
    if (this.state.loading) {
      return <Spinner animation="grow" role="status" />;
    }
    return null;
  };

  handleImageLoaded = () => {
    const loading = !this.state.loading;
    console.log("HomePage -> handleImageLoaded -> loading", loading);
    this.setState({ loading });
  };
  render() {
    return (
      <div>
        {/* <DarkMode /> */}
        <div className={styles.imgContainer}>
          {this.renderSpinner()}
          <img
            src="/assets/img/Academy_of_Technologyall.jpg"
            alt="collegePic"
            onLoad={() => this.handleImageLoaded()}
          />
        </div>
        <div className={styles.textContainer}>
          <h5 style={{ margin: "1px" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            vel eros et erat sollicitudin dignissim quis at tortor. Nam at
            hendrerit tellus, et faucibus nisi. Proin vulputate imperdiet eros,
            non maximus justo varius et. Phasellus tortor velit, blandit ut quam
            vel, rutrum auctor nisi. Etiam dictum sapien velit, eu mattis lacus
            viverra a. Etiam mattis, dui nec dignissim tincidunt, justo felis
            facilisis dolor, id consectetur felis sapien in arcu. Cras
            sollicitudin eros lectus, at laoreet orci convallis non. Proin
            tempor sapien tellus, in ullamcorper ipsum accumsan sed. Cras
            finibus ullamcorper mi.
          </h5>
        </div>
      </div>
    );
  }
}
export default HomePage;
