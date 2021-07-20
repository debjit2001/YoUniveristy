import React, { useState } from "react";
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

const NavigationBar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div>
      <Navbar color="white" light className={styles.navbar}>
        <NavbarBrand href="/" className="mr-auto">
          <img
            src="/assets/img/makaut-logo-1024x256_final.png"
            className={styles.headerImg}
            alt="uniLogo"
          />
        </NavbarBrand>
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
      </Navbar>
    </div>
  );
};
export default NavigationBar;
