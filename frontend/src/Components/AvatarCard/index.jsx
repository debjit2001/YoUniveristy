import React from "react";
import styles from "./style.module.css";

const AvatarCard = ({ userRole = "student" }) => {
  /**
   * Generate Avatar image for AvatarCard Component
   */
  const _generateCardAvatar = () => {
    let avatarImageSrc = null;
    if (userRole === "student") {
      avatarImageSrc = "assets/img/graduate-student-svgrepo-com.svg";
    } else {
      avatarImageSrc = "assets/img/teacher-svgrepo-com.svg";
    }

    return avatarImageSrc;
  };
  /**
   * Generate Avatar name for AvatarCard Component
   */
  const _generateCardName = () => {
    return userRole.toUpperCase();
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <div className={`${styles.cardSide} ${styles.frontFace}`}>
          <div className={styles.cardContent}>
            <img src={_generateCardAvatar()} alt="Not Found" />
            <h3>{_generateCardName()}</h3>
          </div>
        </div>
        <div className={`${styles.cardSide} ${styles.backFace}`}>
          <div className={styles.cardContent}>
            <button className={styles.buttonStyle}>Log in</button>
            <br />
            <button className={styles.buttonStyle}>Sign up</button>
          </div>
        </div>
      </div>
    </div>
    /* <Card className={styles.avatarCard}>
      <CardImg
         top
         width="100%"
         src={_generateCardAvatar()}
         alt={userRole}
         className={styles.cardImage}
       />
       <CardText className={styles.cardText}>{userRole.toUpperCase()}</CardText>
  </Card>*/
  );
};

export default AvatarCard;
