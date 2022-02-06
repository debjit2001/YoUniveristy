import React, { Component } from "react";
import styles from "./App.module.css";
import BaseRouter from "../Components/routes";
// import Data from "../Components/EventListPage/DAta";

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <BaseRouter />
        <footer className={styles.Footer}>
          <a href="mailto:debjit80659@gmail.com">D</a>
          <a href="mailto:pronayrocksguha@gmail.com">P</a>
          <a href="mailto:sagun.jaiswal@aot.edu.in">S</a>
          <a href="mailto:avishake.maji@aot.edu.in">A</a>
          @2020
        </footer>
      </div>
    );
  }
}
export default App;
