import { useState } from "react";
import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
// import './Login.css'
import { Link, withRouter } from "react-router-dom";
import { setChats, setUserInfo } from "../../redux/actions/action.js";

//const user = useSelector((state) => state.userInfo);

// Const dispatch= useDispatch()
// dispatch(setuserinfo(fetchedPerson))
// { user:”userinfo”, accessToken:”token” }
// Const history= useHistory()
// History.push(‘/main/userID”)

//   onClick={this.handleSubmit}

const Login = ({ history }) => {
  // const user = useSelector((state) => state.userInfo)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const login = async () => {
    const obj = { email, password };
    try {
      let response = await fetch(
        `${process.env.REACT_APP_FETCHURL}/users/session`,
        {
          method: "POST",
          body: JSON.stringify(obj),
          credentials: "include",
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
          // Set-Cookie: true
        }
      );
      // console.log(response);
      // console.log(response.headers.get("set-cookie"));

      // console.log(JSON.stringify(obj));
      let data = await response.json();
      if (response.ok) {
        dispatch(setUserInfo(data.user.user));
        dispatch(setChats(data.user.chats));
        setTimeout(() => {
          history.push(`/main/${data.user.user._id}`);
        }, 500);
      } else {
        console.log("Not groovy");
      }
    } catch (error) {
      console.log("Not fergilicious");
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    login();

    // console.log("hello world");
    // const userObject = { username, password };
    // dispatch(setUserInfo(userObject));
    // console.log(userObject);
  };

  return (
    <Container>
      <Row>
        <Col
          xs="6"
          className="mx-auto text-white p-5 d-flex flex-column justify-content-center align-items-center"
        >
          <InputGroup className="my-3 d-flex flex-column justify-content-center align-items-center w-100">
            <div>UserName</div>
            <FormControl
              aria-label="Example text with button addon"
              aria-describedby="basic-addon1"
              className="w-100"
              // value="Paul@hotmail.com"
              onKeyUp={(e) => setEmail(e.target.value)}
            />
            <div className="mt-3">Password</div>
            <FormControl
              className="w-100"
              aria-label="Example text with button addon"
              aria-describedby="basic-addon1"
              onKeyUp={(e) => setPassword(e.target.value)}
            />
          </InputGroup>

          <Button onClick={handleSubmit}>login</Button>
          <a
            href={`${process.env.REACT_APP_FETCHURL}/auth/googleLogin`}
            className="btn btn-info my-1"
          >
            Login with Google
          </a>
          <div className="mt-3">
            not registered? <Link to="/Register">Register Now!</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default withRouter(Login);
