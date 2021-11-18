import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import tempChatExample from './tempChatExample.json' // CHAT OBJECTS EXAMPLE
import { setActiveChat } from "../../redux/actions/action.js";

const mapStateToProps=(state)=>({
  chats: state.chats.list,
});
const mapDispatchToProps=(dispatch)=>(
  {
    selectChat:(id)=>{
      dispatch(setActiveChat(id))
  }
})

const ChatList = ({selectChat}) => {

  // STATE & useEffect FOR TESTING
  const [chats, setChats] = useState();
  const getFakeChats=()=>{
    setChats(tempChatExample)
  }
  useEffect(() => {
    getFakeChats()
  },[]);//socket

  // STARTING BY SINGLE-USER CHAT (NOT GROUP CHAT ALLOWED FOR NOW)
  return (
    <Container
      className="bg-dark text-white"
      style={{ maxHeight: "calc(100vh - 3rem)", overflowY: "scroll" }}
    >
      <h1>Chat List</h1>
      {chats &&
        chats.map((chat) => (
          <Row
          key={chat._id}
          onClick={()=>selectChat(chat._id)}
          >
            <Col xs={2}>
              {chat.members.length === 1 ? (
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

export default connect(mapStateToProps,mapDispatchToProps)(ChatList);
