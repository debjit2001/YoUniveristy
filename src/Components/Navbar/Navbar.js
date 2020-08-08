import React, { Component } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
class Navbar extends Component {
  state = {
    isOpen: false,
  };

  handleClick = () => {
    console.log("Navbar -> handleClick -> handleClick");
    const { isOpen } = this.state;
    console.log("Navbar -> handleClick -> isOpen", isOpen);

    this.setState({
      isOpen: !isOpen,
    });
  };
  render() {
    let { isOpen } = this.state;
    let className = isOpen ? styles.Menushow : styles.Menuhidden;
    return (
      <div className={styles.Navbar}>
        <div className={styles.homeBtn}>
          <Link to="/">
            <i className="fa fa-home" aria-hidden="true"></i>
          </Link>
        </div>
        <div className={styles.pageLink}>
          <div className={styles.Event}>
            <Link to="/event">Events</Link>
          </div>
          <div className={styles.Lost}>
            <Link to="/lostfound">Lost and found</Link>
          </div>
          <div className={styles.Attendance}>
            <Link to="/attendance">Attendance</Link>
          </div>
          <div className={styles.Canteen}>
            <Link to="/canteen">Canteen</Link>
          </div>
        </div>
        <label htmlFor="check" className={styles.menuHandler}>
          <i
            className="fa fa-bars"
            aria-hidden="true"
            onClick={() => this.handleClick()}
          ></i>
        </label>
        <div className={className} onClick={this.handleClick}>
          <Link to="/">home</Link>
          <Link to="/event">Events</Link>
          <Link to="/lostfound">Lost and found</Link>
          <Link to="/attendance">Attendance</Link>
          <Link to="/canteen">Canteen</Link>
        </div>
      </div>
    );
  }
}
export default Navbar;
