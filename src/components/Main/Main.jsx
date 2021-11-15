
import {
  Row,
  Col,
  Container,
  Button,
  Image,
  FormControl,
} from "react-bootstrap";
import "./sidebar-style.css";
import { FiArrowLeft } from "react-icons/fi";
import { FaPen } from "react-icons/fa";
import image from "../../data/Capture1.PNG";


const Main = () => {
  // const profileSidebar = ;

  const showProfile = () => {
    console.log("clicked");
    document
      .getElementsByClassName("sidebar-bt")[0]
      .classList.add("profile-open");
    document.getElementsByClassName("picIm")[0].classList.add("pic-height");
  };

  const hideProfile = () => {
    console.log("clicked");
    document
      .getElementsByClassName("sidebar-bt")[0]
      .classList.remove("profile-open");
    document.getElementsByClassName("picIm")[0].classList.remove("pic-height");
  };

  return (
    <Container>
      <Row>
        <Col xs={4}>
          {/* <Button onclick={showProfile}> SHOW</Button> */}
          <Row className="sidebar-bt profile-container">
            <Col>
              <Row className="bg-1 px-3">
                <div className="profile">
                  <FiArrowLeft
                    className="arrow"
                    onClick={() => hideProfile()}
                  />
                  <span className="pl-3"> Profile</span>
                </div>
              </Row>
              <Row className="bg-2 px-3 d-flex flex-column">
                <div className="mx-auto pic">
                  <img className="picIm" src={image} alt="" />
                </div>

                <div className="input-heading">Your name</div>
                <input
                  className="formStyle"
                  value="Barry"
                  aria-describedby="basic-addon1"
                />
                <div className="text-muted">
                  This is not your username or pin. This name will be visible to
                  your WhatsApp contacts
                </div>
                <div className="input-heading">About</div>
                {/* <div className="input">Hey there, I am using WhatsApp</div> */}
                <input
                  className="formStyle"
                  value="Hey there, I am using WhatsApp"
                  aria-describedby="basic-addon1"
                />
              </Row>
            </Col>
          </Row>

          <Row><ChatList/></Row>

        </Col>
        <Col xs={8}>
          <Button onClick={() => showProfile()}> SHOW</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Main;
