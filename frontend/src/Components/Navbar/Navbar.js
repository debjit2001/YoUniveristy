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
  const navLinkStyle = { color: "#fff", fontSize: 20 };

  return (
    <div>
      <Navbar color="white" light>
        <NavbarBrand
          href="/"
          className="mr-auto"
          style={{ marginLeft: 0, float: "left" }}
        >
          <img
            src="/assets/img/makaut-logo-1024x256_final.png"
            className={styles.headerImg}
            alt="uniLogo"
          />
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav
            style={{
              display: "block",
              flexBasis: "100%",
              flexGrow: 1,
              backgroundColor: "#020031",
              color: "#fff",
              width: "100vw",
              alignContent: "center",
              marginLeft: "-20px",
              marginBottom: "-8px",
              marginTop: "8px",
            }}
          >
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
