import dateFormat from "dateformat";
import React, { useEffect, useState } from "react";
import { BsEmojiSmile, BsThreeDotsVertical } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { withRouter } from "react-router";
import PictureModal from "./Picture";
import "./style.css";

function MessageChat({ match }) {
  const [Message, setMessage] = useState("");
  //
  const sendMessage = () => {
    alert(Message);
  };
  // to DELETE
  const MessTest = [
    {
      _id: 123321,
      name: "John",
      message: "Hello there!",
      createdAt: new Date(),
    },
    {
      _id: 1,
      name: "Me",
      message: "Hi there!",
      createdAt: new Date(),
    },
  ];
  useEffect(() => {
    console.log(match.params.id);
  }, []);
  return (
    <div className="d-flex flex-column message-chat h-100">
      <div className="chat-profile d-flex justify-content-between">
        {/* TOP */}
        <div className="d-flex">
          {/* left side */}
          <div>
            <img
              src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
              alt=""
              style={{
                width: "40px",
                aspectRatio: "1/1",
                objectFit: "cover",
                borderRadius: "50%",
                marginRight: "1rem",
              }}
            />
          </div>
          <div className="d-flex flex-column">
            <h6 className="m-0">Name</h6>
            <small>Online/Typing</small>
          </div>
        </div>
        {/* right side */}
        <div className="d-flex align-items-center">
          <div className="mx-1">
            <PictureModal />
            {/* <input name="myFile" type="file" /> */}
          </div>
          <div className="mx-1">
            <BsThreeDotsVertical size="1.4rem" style={{ cursor: "pointer" }} />
          </div>
        </div>
      </div>
      {/* CHAT SECTION */}
      <div className="d-flex flex-column h-100 messages p-2">
        {/* Message */}
        {MessTest.map((m) => (
          <div
            className={`messageStyle my-1 ${
              m._id.toString() === match.params.id.toString() && "ml-auto"
            }`}
          >
            <span className="mr-1">{m.message}</span>
            <small className="ml-auto text-muted">
              {dateFormat(m.createdAt, "HH:MM")}
            </small>
          </div>
        ))}
      </div>
      {/* SEND SECTION */}
      <div className="mt-auto d-flex justify-content-between sendmessage">
        <div>
          <BsEmojiSmile size="1.4rem" />
        </div>
        <div className="w-75">
          <input
            type="text"
            className="w-100"
            value={Message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        {Message.length > 0 ? (
          <div>
            <FiSend
              size="1.4rem"
              onClick={sendMessage}
              style={{ cursor: "pointer" }}
            />
          </div>
        ) : (
          <div>
            <FaMicrophone size="1.4rem" style={{ cursor: "pointer" }} />
          </div>
        )}
      </div>
    </div>
  );
}

export default withRouter(MessageChat);
