import { Row, Col, Container, Button, Image } from "react-bootstrap";
import "./sidebar-style.css";
import { FiArrowLeft } from "react-icons/fi";

const Main = () => {
  const showProfile = () => {
    console.log("profile");
  };

  return (
    <Container>
      <Row>
        <Col xs={4}>
          {/* <Button onclick={showProfile}> SHOW</Button> */}
          <Row className="sidebar-bt">
            <Col>
              <Row className="bg-1 px-3">
                <div className="profile">
                  <FiArrowLeft />
                  <span className="pl-3"> Profile</span>
                </div>
              </Row>
              <Row className="bg-2 px-3">
                <div>
                  <Image
                    //   className="profileimagesmall"
                    src={this.state.user.image}
                    roundedCircle
                  />
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </Row>
            </Col>
          </Row>
          <Row></Row>
        </Col>
        <Col xs={8}></Col>
      </Row>
    </Container>
  );
};

export default Main;
