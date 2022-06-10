import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
// import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import ImageWrapper from "Components/Image-Wrapper";

const NavigationBar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [viewPortWidth, setViewPortWidth] = useState(window.innerWidth);

  // const [isSmallScreen, setIsSmallScreen] = useState(false);
  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const handleWindowResize = () => setViewPortWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <>
      <Navbar color="white" light className={styles.navbar}>
        <NavbarBrand href="/" className="mr-auto">
          <img
            src="/assets/img/makaut-logo-1024x256_final.png"
            className={styles.headerImg}
            alt="uniLogo"
          />
        </NavbarBrand>
        {viewPortWidth < 768 ? (
          <>
            <NavbarToggler onClick={toggleNavbar} className="mr-2" />
            <Collapse isOpen={!collapsed} navbar style={{ zIndex: 9999 }}>
              <Nav className={styles.navDropDown}>
                <NavItem>
                  <NavLink className={styles.navLink} href="/event">
                    Event
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className={styles.navLink} href="/lostFound">
                    Lost and Found
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className={styles.navLink} href="/attendance">
                    Attendance
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className={styles.navLink} href="/canteen">
                    Canteen
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </>
        ) : (
          <>
            <div className={styles.lgNavBtnContainer}>
              <button className={styles.navButton}>
                <a href="/event" className={styles.navLink}>
                  Event
                </a>
              </button>
              <button className={styles.navButton}>
                <a className={styles.navLink} href="/lostFound">
                  Lost and Found
                </a>
              </button>
              <button className={styles.navButton}>
                <a className={styles.navLink} href="/attendance">
                  Attendance
                </a>
              </button>
              <button className={styles.navButton}>
                <a className={styles.navLink} href="/canteen">
                  Canteen
                </a>
              </button>
            </div>
          </>
        )}
      </Navbar>
    </>
  );
};
export default NavigationBar;
