import { Row, Col, Container } from "react-bootstrap";
import ChatList from "./ChatList";

const Main = () => {
  return (
    <Container>
      <Row>
        <Col xs={4}>
          <Row></Row>
          <Row><ChatList/></Row>
        </Col>
        <Col xs={8}></Col>
      </Row>
    </Container>
  );
};

export default Main;
