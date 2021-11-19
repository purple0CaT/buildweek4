import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";
import { setActiveChat, setChats } from "../../redux/actions/action.js";
import dateformat from "dateformat";

const mapStateToProps = (state) => ({
  chats: state.chats.list,
});
const mapDispatchToProps = (dispatch) => ({
  selectChat: (chat) => {
    dispatch(setActiveChat(chat));
  },
});

const ChatList = ({ selectChat }) => {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats.list);
  // STATE & useEffect FOR TESTING
  // const [chats, setChats] = useState([]);
  // const getFakeChats = () => {
  //   setChats(tempChatExample);
  // };
  const getRealChats = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_FETCHURL}/chats`, {
        credentials: "include",
      });
      if (response.ok) {
        const chatsRes = await response.json();
        // console.log(chatsRes);
        dispatch(setChats(chatsRes));
      }
    } catch (error) {
      console.log(error);
    }
  };
  //
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
          <Row
            key={chat._id + 1}
            onClick={() => selectChat(chat)}
            className="justify-content-between align-items-center my-2 p-2"
            style={{ cursor: "pointer" }}
          >
            {/* {console.log(chat)} */}
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
                <p className="m-0">
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
