import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import io from "socket.io-client";
import tempChatExample from './tempChatExample.json'

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

  // const [users, setUsers] = useState();
  // const socket = io.connect('http://localhost:3003/chats')
	// const fetchMessageResponse = (data) => {
	// 	setUsers((users) => {
	// 		const { userId, response } = data;

	// 		let userIndex = users.findIndex((user) => user.id === userId);
	// 		const usersCopy = JSON.parse(JSON.stringify(users));
	// 		const newMsgObject = {
	// 			content: response,
	// 			sender: userId,
	// 			time: new Date().toLocaleTimeString(),
	// 			status: null,
	// 		};

	// 		usersCopy[userIndex].messages.TODAY.push(newMsgObject);

	// 		return usersCopy;
	// 	});
	// };



    


  /*
  const getChats=async()=>{
    try {
      const chatsResp=await fetch('http://localhost:3003/chats',{
        method:'GET',
        headers:{
          // 'Accept': 'application/json', // This is set on request
          // 'Content-Type': 'application/json', // This is set on request
          // //'X-CSRF-Token': 'abcdefghijklmnop', // This is set on request
          // 'Cache': 'no-cache', // This is set on request
          // credentials: 'same-origin', // This is set on request
          // withCredentials: true,
          // credentials:'Access-Control-Allow-Origin',
          //credentials:'same-origin',
          //'accessToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzcyMzUyMDMsImV4cCI6MTYzNzMyMTYwM30.Y01rcv0yoEORn6S-DsyALgiZfsZVfnJaYXnB92P23sg' // This is missing from request
          cookie:'accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzcyMzUyMDMsImV4cCI6MTYzNzMyMTYwM30.Y01rcv0yoEORn6S-DsyALgiZfsZVfnJaYXnB92P23sg'
        }
      })
      if(chatsResp.ok){
        let chatsData=await chatsResp.json()
        console.log('CHATS DATA FROM FETCH: ',chatsData)
        setChats(chatsData)
      }
    } catch (error) {
      
    }
  }
*/
  // STATE FOR TESTING
  const [chats, setChats] = useState();
  const getFakeChats=()=>{
    setChats(tempChatExample)
  }
  useEffect(() => {
    // socket.on("fetch_response", fetchMessageResponse);
    console.log('HERE: ',tempChatExample)
    //getChats()
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
