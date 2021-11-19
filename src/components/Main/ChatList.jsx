import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { setActiveChat } from "../../redux/actions/action.js";
import tempChatExample from "./TempChatExample.json"; // CHAT OBJECTS EXAMPLE

const mapStateToProps = (state) => ({
  chats: state.chats.list,
});
const mapDispatchToProps = (dispatch) => ({
  selectChat: (id) => {
    dispatch(setActiveChat(id));
  },
});

const ChatList = ({ selectChat }) => {
  // STATE & useEffect FOR TESTING
  const [chats, setChats] = useState([]);
  // const getFakeChats = () => {
  //   setChats(tempChatExample);
  // };

  const getRealChats = async () => {
    try {
      let response = await fetch(`http://localhost:3003/chats`, {
        credentials: "include",
      });
      if (response.ok) {
        const chatsRes = await response.json();
        console.log(chatsRes);
        setChats(chatsRes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRealChats();
  }, []); //socket

  // STARTING BY SINGLE-USER CHAT (NOT GROUP CHAT ALLOWED FOR NOW)
  return (
    <Container
      className="bg-dark text-white"
      style={{ maxHeight: "calc(100vh - 3rem)", overflowY: "scroll" }}
    >
      <h1>Chat List</h1>
      {chats &&
        chats.map((chat) => (
          <Row key={chat._id} onClick={() => selectChat(chat._id)}>
            {console.log(chat)}
            <Col xs={2}>
              {chat.members && chat.members.length === 1 ? (
                <img
                  src={chat.members[0].avatar}
                  alt="friend avatar"
                  className="rounded-circle"
                  style={{ height: 48 }}
                />
              ) : (
                <img
                  src="https://via.placeholder.com/300.png"
                  alt="placeholder"
                  className="rounded-circle"
                  style={{ height: 48 }}
                />
              )}
            </Col>
            <Col xs={8}>
              {chat.members.length === 1 ? (
                <p>
                  <strong>{chat.members[0].username}</strong>
                </p>
              ) : (
                <p>
                  <strong>GROUP CHAT NAME</strong>
                </p>
              )}
              <p>{chat.history.at(-1).content.text}</p>
            </Col>
            <Col xs={2}>
              <p>{chat.history.at(-1).timestamp}</p>
            </Col>
          </Row>
        ))}
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
