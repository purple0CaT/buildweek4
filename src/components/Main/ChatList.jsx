import React, { useEffect, useState } from "react";
import { Col, Container, Row, InputGroup, FormControl } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { setActiveChat, setChats } from "../../redux/actions/action.js";

const mapStateToProps = (state) => ({
  chats: state.chats.list,
});
const mapDispatchToProps = (dispatch) => ({
  selectChat: (chat) => {
    dispatch(setActiveChat(chat));
  },
  // setChats: (array)
});

const ChatList = ({ selectChat }) => {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats.list);
  // STATE & useEffect FOR TESTING
  // const [chats, setChats] = useState([]);
  // const getFakeChats = () => {
  //   setChats(tempChatExample);
  // };
  const dispatch = useDispatch();
  const [searchUsers, setSearchUsers] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const userId = useSelector((state) => state.userInfo._id);
  const toggleModel = () => {
    setShowModel(!showModel);
  };

  const getRealChats = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_FETCHURL}/chats`, {
        credentials: "include",
      });
      if (response.ok) {
        const chatsRes = await response.json();
        console.log(chatsRes);
        dispatch(setChats(chatsRes));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async (query) => {
    try {
      let response = await fetch(
        `http://localhost:3003/users/search/${query}`,
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const usersRes = await response.json();
        console.log(usersRes);
        setSearchUsers(usersRes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createNewChat = async (receiverId) => {
    const obj = {
      name: "All the lads3",
      image: "",
    };
    try {
      let response = await fetch(
        `http://localhost:3003/chats/createChat/${receiverId}`,
        {
          method: "POST",
          body: JSON.stringify(obj),
          credentials: "include",
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        const newChatRes = await response.json();
        console.log(newChatRes);
        dispatch(setChats(newChatRes));
        // setSearchUsers(usersRes);
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
      <h1 onClick={toggleModel} style={{ cursor: "pointer" }}>
        Users
      </h1>
      {showModel ? (
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Default
          </InputGroup.Text>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            onChange={(e) => getUsers(e.target.value)}
          />
        </InputGroup>
      ) : (
        ""
      )}
      {searchUsers.length > 0 &&
        searchUsers.map((user) => (
          <p>
            <strong
              onClick={() => createNewChat(user._id)}
              style={{ cursor: "pointer" }}
            >
              {user.username}
            </strong>
          </p>
        ))}
      {console.log(chats)}
      {chats &&
        chats.map((chat) => (
          <Row
            key={chat._id + 1}
            onClick={() => selectChat(chat)}
            className="justify-content-between align-items-center my-2 p-2"
            style={{ cursor: "pointer" }}
          >
            {/* {console.log(chat)} */}
            <Col xs={2}>
              {chat.members && chat.members.length === 2 ? (
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
              {chat.members && chat.members.length === 2 ? (
                <p>
                  <strong>{chat.members[0].username}</strong>
                </p>
              ) : (
                <p className="m-0">
                  <strong className="m-0">Chat name</strong>
                </p>
              )}
              <p className="m-0">
                {chat.history && chat.history.at(-1).content.text}
              </p>
            </Col>
            <Col xs={2}>
              <p className="m-0">
                {console.log(chat.history.at(-1))}
                {chat.history &&
                  dateformat(chat.history.at(-1).createdAt, "HH:MM")}
              </p>
            </Col>
          </Row>
        ))}
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
