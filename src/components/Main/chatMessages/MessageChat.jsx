import dateFormat from "dateformat";
import Picker from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
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
import { setActiveChat, setChats } from "../../../redux/actions/action";
import ChatSetting from "./ChatSetting";
import PictureModal from "./Picture";
import "./style.css";
//
const socket = io(process.env.REACT_APP_FETCHURL, {
  withCredentials: true,
  transports: ["websocket"],
});
//
function MessageChat() {
  const activeChat = useSelector((state) => state.chats.active);
  const user = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  let chatMembers = activeChat.members.filter((M) => M._id !== user._id);
  //
  const [CloseSettingsModal, setCloseSettingsModal] = useState(false);
  const [Message, setMessage] = useState("");
  const [ShowEmoji, setShowEmoji] = useState(false);
  // EMOFI
  const onEmojiClick = (event, emojiObject) => {
    setMessage(Message + emojiObject.emoji);
  };

  // AUTO SCROLL
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [activeChat.history]);

  //
  const sendMessage = () => {
    // alert(Message);
    socket.emit("sendmessage", {
      message: Message,
      media: "",
      room: activeChat._id,
    });
    setMessage("");
  };
  //
  const closeSettings = () => {
    setCloseSettingsModal(!CloseSettingsModal);
  };
  // SOCKET IO
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connect");
    });
    socket.on("message", ({ chatHistory, allChats }) => {
      // pingIt();
      dispatch(setActiveChat(chatHistory));
      dispatch(setChats(allChats));
    });
    // socket.on("ping", (val) => {
    //   console.log("Ping!");
    //   // setTimeout(() => {
    //   // pingIt();
    //   // }, 100);
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="d-flex flex-column message-chat mx-n2">
      <div className="chat-profile d-flex justify-content-between">
        {/* TOP */}
        <div className="d-flex">
          {/* left side */}
          {activeChat &&
            chatMembers.map((M) => (
              <>
                <div key={M._id + 321}>
                  <img
                    src={
                      M.avatar ||
                      "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
                    }
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
                  <h6 className="m-0">{M.username}</h6>
                  <small>{M.socket ? "Online" : "Offline"}</small>
                </div>
              </>
            ))}
        </div>
        {/* right side */}
        <div className="d-flex align-items-center">
          <div className="mx-1">
            <PictureModal />
          </div>
          <div className="mx-1">
            <BsThreeDotsVertical
              size="1.4rem"
              style={{ cursor: "pointer" }}
              onClick={closeSettings}
            />
          </div>
        </div>
        <ChatSetting
          closeSettings={closeSettings}
          CloseSettingsModal={CloseSettingsModal}
        />
      </div>

      {/* CHAT SECTION */}
      <div className="d-flex flex-column messages p-2">
        {/* <div className=" p-2"> */}
        {/* Message */}
        {activeChat.history &&
          activeChat.history.length > 0 &&
          activeChat.history.map((m) => (
            <div
              key={m._id + 54}
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
        <div ref={messagesEndRef} />

        {/* </div> */}
      </div>
      {/* SEND SECTION */}
      <Row className="mt-auto d-flex justify-content-between sendmessage mx-0">
        <Col xs="2" className="position-relative d-flex justify-content-center">
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
        </Col>
        <Col xs="9" className="w-100">
          <input
            type="text"
            className="w-100 px-2"
            value={Message}
            onKeyUp={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Col>
        {Message.length > 0 ? (
          <Col xs="1">
            <FiSend
              size="1.4rem"
              onClick={sendMessage}
              style={{ cursor: "pointer" }}
            />
          </Col>
        ) : (
          <Col xs="1">
            <FaMicrophone size="1.4rem" style={{ cursor: "pointer" }} />
          </Col>
        )}
      </Row>
    </div>
  );
}

export default withRouter(MessageChat);
