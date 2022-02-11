import React from "react";
import { Card, CardImg, CardText, Col } from "reactstrap";
import styles from "./style.module.css";

const AvatarCard = ({ userRole = "student" }) => {
  /**
   * Generate Avatar image for AvatarCard Component
   */
  const _generateCardAvatar = () => {
    let avatarImageSrc = null;
    if (userRole === "student ") {
      avatarImageSrc = "assets/img/graduate-student-svgrepo-com.svg";
    } else {
      avatarImageSrc = "assets/img/teacher-svgrepo-com.svg";
    }

    return avatarImageSrc;
  };

  return (
    <Col sm="6">
      <Card body className={styles.cardView}>
        <CardImg
          top
          width="100%"
          src={_generateCardAvatar()}
          alt={userRole}
          className={styles.cardImage}
        />
        <CardText>{userRole.toUpperCase()}</CardText>
      </Card>
    </Col>
  );
};

export default AvatarCard;
