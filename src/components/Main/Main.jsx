import { Button, Col, Container, Row, Image } from "react-bootstrap";
import { FiArrowLeft } from "react-icons/fi";
// import image from "../../data/Capture1.PNG";
import MessageChat from "./chatMessages/MessageChat";
import "./sidebar-style.css";
import ChatList from "./ChatList";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Main = () => {
  const profile = useSelector((state) => state.userInfo);
  const stockImage =
    "https://res.cloudinary.com/btrearty/image/upload/v1637232496/avatar/oitc3d8ldczeli6bmvdt.png";

  const [imageFile, setimageFile] = useState(stockImage);

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

  const imageUploadChecker = async (e) => {
    if (e.target.files.length == 0) {
      console.log("No image selected!");
    } else {
      setimageFile(e.target.files[0]);
      console.log(imageFile);
    }
  };

  const uploadImage = async () => {
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
  };

  const showImage = () => {
    if (imageFile !== stockImage) uploadImage();
  };

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
                      onChange={(e) => imageUploadChecker(e)}
                    />
                  </div>
                  {profile.avatar ? (
                    <img
                      id="proPic"
                      className="picIm"
                      src={profile.avatar}
                      alt=""
                      onClick={showImage}
                    />
                  ) : (
                    <img
                      className="picIm"
                      src={stockImage}
                      alt=""
                      onClick={showImage}
                    />
                  )}
                  {/* {imageUploaded ? (
                    <img className="picIm" src={profile.avatar} alt="" />
                  ) : (
                    <div className="text-center m-auto">
                      <div className="m-auto imageuploadtext text-primary px-2 pt-1">
                        
                      </div>
                      <img className="picIm" src={profile.avatar} alt="" />
                    </div>
                  )} */}
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

export default Main;
