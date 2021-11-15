import { Col, Container, Row } from "react-bootstrap";
import MessageChat from "./chatMessages/MessageChat";

const Main = () => {
  return (
    <Container className="h-100">
      <Row className="h-100">
        <Col xs={4}>
          <Row>Person</Row>
          <Row>Chats</Row>
        </Col>
        <Col xs={8}>
          <MessageChat />
        </Col>
      </Row>
    </Container>
  );
};

export default Main;
