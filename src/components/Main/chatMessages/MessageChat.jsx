import dateFormat from "dateformat";
import Picker from "emoji-picker-react";
import React, { useEffect, useState } from "react";
import {
  BsEmojiSmile,
  BsEmojiSmileUpsideDown,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { io } from "socket.io-client";
import { setActiveHistory } from "../../../redux/actions/action";
import PictureModal from "./Picture";
import "./style.css";
//

// const ADDRESS = process.env.REACT_APP_URLFETCH;
const socket = io("http://localhost:3003", {
  // transportOptions: { withCredentials: true },
  withCredentials: true,
  transports: ["websocket"],
  // extraHeaders: {
  //   Cookie: window.document.cookie,
  // },
  // query: {
  //   accessToken:
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTk0ZTVkYmRmNjNkMWM5ZDYzMzlmMDciLCJpYXQiOjE2MzcyMzA3MTQsImV4cCI6MTYzNzMxNzExNH0.rcgBpwSUQ8_gIILdZVJpkU8ICItZ-t34eD4O1-lwaiI",
  // },
  // // cookie: "john=123;",
  // auth: {
  //   accessToken:
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTk0ZTVkYmRmNjNkMWM5ZDYzMzlmMDciLCJpYXQiOjE2MzcyMzA3MTQsImV4cCI6MTYzNzMxNzExNH0.rcgBpwSUQ8_gIILdZVJpkU8ICItZ-t34eD4O1-lwaiI",
  // },
});
//
function MessageChat() {
  const [Message, setMessage] = useState("");
  const [ShowEmoji, setShowEmoji] = useState(false);
  const activeChat = useSelector((state) => state.chats.active);
  const user = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  //
  const onEmojiClick = (event, emojiObject) => {
    console.log(emojiObject);
    setMessage(Message + emojiObject.emoji);
  };
  //
  const sendMessage = () => {
    // alert(Message);
    socket.emit("sendmessage", {
      message: Message,
      img: "",
      room: activeChat._id,
    });
    setMessage("");
  };
  //
  useEffect(() => {
    // console.log("Test!");
    // console.log(document.cookie);
    socket.on("connect", () => {
      console.log("connect");
    });
    socket.on("message", (messages) => {
      // alert(message.content.text);
      // console.log(messages);
      dispatch(setActiveHistory(messages.history));
    });
    // socket.on("loggedin", () => {
    //   alert("U are loggedIn!");
    //   setLogged(true);
    //   fetchUsers();
    //   socket.on("newConnection", () => {
    //     fetchUsers();
    //   });
    // });
    socket.on("join", (message) => {
      console.log(message);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="d-flex flex-column message-chat">
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
          </div>
          <div className="mx-1">
            <BsThreeDotsVertical size="1.4rem" style={{ cursor: "pointer" }} />
          </div>
        </div>
      </div>
      {/* CHAT SECTION */}
      <div className="d-flex flex-column messages p-2">
        {/* <div className=" p-2"> */}
        {/* Message */}
        {activeChat.history.map((m) => (
          <div
            className={`messageStyle my-1 ${
              m.sender._id.toString() === user._id.toString() && "ml-auto"
            }`}
          >
            <span className="mr-1">{m.content.text}</span>
            <small className="ml-auto text-muted">
              {dateFormat(m.createdAt, "HH:MM")}
            </small>
          </div>
        ))}
        {/* </div> */}
      </div>
      {/* SEND SECTION */}
      <div className="mt-auto d-flex justify-content-between sendmessage">
        <div className="position-relative">
          {!ShowEmoji ? (
            <BsEmojiSmile
              size="1.4rem"
              onClick={() => setShowEmoji(!ShowEmoji)}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <BsEmojiSmileUpsideDown
              size="1.4rem"
              onClick={() => setShowEmoji(!ShowEmoji)}
            />
          )}
          {ShowEmoji && (
            <div
              className="emojiBoard"
              onMouseLeave={() => setShowEmoji(false)}
            >
              <Picker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>
        <div className="w-75">
          <input
            type="text"
            className="w-100"
            value={Message}
            onKeyUp={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
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
