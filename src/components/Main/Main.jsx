import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FiArrowLeft } from "react-icons/fi";
import { useSelector } from "react-redux";
import ChatList from "./ChatList";
// import image from "../../data/Capture1.PNG";
import MessageChat from "./chatMessages/MessageChat";
import "./sidebar-style.css";
import { withRouter } from "react-router-dom";

const Main = ({ history }) => {
  const profile = useSelector((state) => state.userInfo);

  // const [profile, setProfile] = useState({});
  const [imageUploaded, setimageUploaded] = useState(false);
  const [imageFile, setimageFile] = useState(
    "https://res.cloudinary.com/btrearty/image/upload/v1637232496/avatar/oitc3d8ldczeli6bmvdt.png"
  );

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

  const imageUploadChecker = (e) => {
    if (e.target.files.length == 0) {
      console.log("No image selected!");
    } else {
      setimageFile(e.target.files[0]);
    }
  };

  const uploadImage = async () => {
    // if (imageFile.length > 0) {
    const formData = new FormData();
    formData.append("avatar", imageFile);
    console.log(formData);
    try {
      let response = await fetch(`http://localhost:3003/users/me/avatar`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (response.ok) {
        const imageUploadResponse = await response.json();
        console.log(imageUploadResponse);
      }
    } catch (error) {
      console.log(error);
    }
    // } else {
    //   console.log("No image selected!");
    // }
  };

  const LogOut = async () => {
    try {
      let response = await fetch(`http://localhost:3003/users/session`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        // const logOutRes = await response.json();
        // console.log(logOutRes);
        history.push("/Login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   socket.on("connect", () => {
  //     socket.emit(`loggedin`, { newUser });
  //     console.log(`Connection ${newUser}!`);
  //   });
  // });

  // useEffect(() => getMyProfile(), []);

  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col xs={4}>
          <Button onClick={() => showProfile()}> SHOW</Button>
          {/* <Button onclick={showProfile}> SHOW</Button> */}
          <Row className="sidebar-bt profile-container position-absolute">
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
                  {/* <img className="picIm" src={profile.image} alt="" /> */}
                  {imageUploaded ? (
                    // <Image src={imageFile} fluid />
                    // <img className="picIm" src={profile.image} alt="" />
                    <img className="picIm" src={profile.avatar} alt="" />
                  ) : (
                    <div className="text-center m-auto">
                      <div className="m-auto imageuploadtext text-primary px-2 pt-1">
                        <label
                          for="file-upload"
                          className="custom-file-upload py-2"
                        >
                          Select image
                        </label>

                        <input
                          className="d-none"
                          id="file-upload"
                          type="file"
                          onChange={(e) => {
                            setimageFile(e);
                            uploadImage();
                          }}
                        />
                      </div>
                      {/* <img className="picIm" src={profile.image} alt="" /> */}
                      <img className="picIm" src={profile.avatar} alt="" />
                    </div>
                  )}
                </div>

                <div className="input-heading">Your name</div>
                <input
                  className="formStyle"
                  value={profile.name}
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
                <div className="input-heading">
                  <Button onClick={LogOut}>Log Out</Button>
                </div>
              </Row>
            </Col>
          </Row>

          <Row>
            <ChatList />
          </Row>
        </Col>
        <Col xs={8}>
          <MessageChat />
        </Col>
      </Row>
    </Container>
  );
};

export default withRouter(Main);
