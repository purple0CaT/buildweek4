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

  // const [profile, setProfile] = useState({});
  const [imageUploaded, setimageUploaded] = useState(false);
  const [imageFile, setimageFile] = useState(
    "https://res.cloudinary.com/btrearty/image/upload/v1637232496/avatar/oitc3d8ldczeli6bmvdt.png"
  );
  // const [imageFile, setimageFile] = useState();
  // const [imagePreview, setimagePreview] = useState(
  //   "https://res.cloudinary.com/btrearty/image/upload/v1637232496/avatar/oitc3d8ldczeli6bmvdt.png"
  // );

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

  // const getMyProfile = async () => {
  //   try {
  //     let response = await fetch(`http://localhost:3003/users/me`, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkzYTI5NDEyNTdjZjU5ZWM3MDRhMWEiLCJpYXQiOjE2MzcyMjk2MjAsImV4cCI6MTYzNzMxNjAyMH0.fd61ct7VmoE3LPkddZR5mUza2yh68qgAkNiF7qbF_Sg`,
  //         cookie: `accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkzYTI5NDEyNTdjZjU5ZWM3MDRhMWEiLCJpYXQiOjE2MzcyMjk2MjAsImV4cCI6MTYzNzMxNjAyMH0.fd61ct7VmoE3LPkddZR5mUza2yh68qgAkNiF7qbF_Sg; refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkzYTI5NDEyNTdjZjU5ZWM3MDRhMWEiLCJpYXQiOjE2MzcyMjk2MjAsImV4cCI6MTYzNzgzNDQyMH0.0vnJrJBd-QMKCkeJbgFDNQ6nFrarMI1PpE3w9dAX_iI`,
  //       },
  //     });
  //     let myProfile = await response.json();
  //     setProfile(myProfile);
  //     console.log(profile);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
        // headers: {
        //   Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkzYTI5NDEyNTdjZjU5ZWM3MDRhMWEiLCJpYXQiOjE2MzcyMjk2MjAsImV4cCI6MTYzNzMxNjAyMH0.fd61ct7VmoE3LPkddZR5mUza2yh68qgAkNiF7qbF_Sg`,
        //   cookie: `accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkzYTI5NDEyNTdjZjU5ZWM3MDRhMWEiLCJpYXQiOjE2MzcyMjk2MjAsImV4cCI6MTYzNzMxNjAyMH0.fd61ct7VmoE3LPkddZR5mUza2yh68qgAkNiF7qbF_Sg; refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkzYTI5NDEyNTdjZjU5ZWM3MDRhMWEiLCJpYXQiOjE2MzcyMjk2MjAsImV4cCI6MTYzNzgzNDQyMH0.0vnJrJBd-QMKCkeJbgFDNQ6nFrarMI1PpE3w9dAX_iI`,
        // },
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
