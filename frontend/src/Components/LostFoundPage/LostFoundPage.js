import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

import styles from "./LostFoundPage.module.css";

export default class LostFoundPage extends Component {
  render() {
    return (
      <React.Fragment>
        <h2 className={styles.heading}>
          YOU LOST SOMETHING? <br />
          Check if we have found it or not in the found section! If not then
          post an enquiry at the lost section below
        </h2>
        <div className={styles.frontPageContainer}>
          <Link to="/lost">
            <Tippy
              content="Lost Section"
              delay={200}
              placement="top"
              theme="honeybee"
            >
              <Button variant="primary" size="lg" block>
                L O S T
              </Button>
            </Tippy>
          </Link>
          <span>
            <Link to="/found">
              <Tippy content="Found Section" delay={200} placement="bottom">
                <Button variant="secondary" size="lg" block>
                  F O U N D
                </Button>
              </Tippy>
            </Link>
          </span>

          <div style={{ fontWeight: "inherit", padding: "60px" }}>
            This part of our web app is used for reporting lost or found items.
            You can also look for the lost or found items added by others. It
            serves as a university-wide online database of, lost and found
            items. As soon as you lose or find anything inside the campus, all
            you have to do is update details about lost and found items here.
            Reduce your sin by making an attempt to return back the items or
            valuable things you found to its true owner. After all we all should
            have a good heart ;)
          </div>
        </div>
      </React.Fragment>
    );
  }
}
