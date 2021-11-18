import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";

// *********************** CHAT SHAPE ******************************
/*
{
    '_id':'chatID',
    'members':[{
        '_id':'memberID',
        'username':'Lollo Petronio',
        'email':'petronio@gmail.com',
        'avatar':'https://via.placeholder.com/300.png/09f'
    }],
    'history':[{
        '_id':'historyElementID',
        'timestamp':'today',
        'sender':'Lollo',
        'content':{
            'text':'HI MARCO HOW R U',
            'media':''  
        } 
            }]
        }
        */
// ******************************************************************
const mapStateToProps = (state) => ({
  chats: state.chats.list,
});

const ChatList = () => {
  // STATE FOR TESTING
  const [chats, setChats] = useState();

  useEffect(() => {
    console.log(chats);
  });

  // STARTING BY SINGLE-USER CHAT (NOT GROUP CHAT ALLOWED FOR NOW)
  return (
    <Container
      className="bg-dark text-white"
      style={{ maxHeight: "calc(100vh - 3rem)", overflowY: "scroll" }}
    >
      <h1>Chat List</h1>
      {chats &&
        chats.map((chat) => (
          <Row key={chat._id}>
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

export default connect(mapStateToProps)(ChatList);
