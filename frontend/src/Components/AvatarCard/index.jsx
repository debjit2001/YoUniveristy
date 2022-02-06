import React from 'react';
import { Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Button, Row, Col } from 'reactstrap';
import styles from "./style.module.css";

const AvatarCard = (props) => {
  return (
    <Row>
      <Col sm="6">
        <Card body className={styles.cardView}>
          <CardImg top width="100%" src="assets/img/graduate-student-svgrepo-com.svg" alt="Card image cap" className={styles.cardImage} />  
          <CardText>STUDENT</CardText>
          {/* <Button className='btn btn-success'>VISIT</Button> */}
        </Card>
      </Col>
      <Col sm="6">
        <Card body className={styles.cardView}>
          <CardImg top width="100%" src="assets/img/teacher-svgrepo-com.svg" alt="Card image cap" className={styles.cardImage} />
          <CardText>TEACHER</CardText>
          {/* <Button className='btn btn-success'>VISIT</Button> */}
        </Card>
      </Col>
    </Row>
  );
};

export default AvatarCard;