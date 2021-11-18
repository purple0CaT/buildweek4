import {
  InputGroup,
  Button,
  FormControl,
  DropdownButton,
  Dropdown,
  FormGroup,
  Form,
} from "react-bootstrap";
// import './Login.css'
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setChats, setUserInfo } from "../../redux/actions/action.js";
import { withRouter } from "react-router-dom";

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
      let response = await fetch(`http://localhost:3003/users/session`, {
        method: "POST",
        body: JSON.stringify(obj),
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
      });
      console.log(response);
      console.log(response.headers.set("set-cookie"));

      console.log(JSON.stringify(obj));
      let data = await response.json();
      if (response.ok) {
        dispatch(setUserInfo(data.user.user));
        dispatch(setChats(data.user.chats));
        history.push("/main/userID");
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
    <div>
      <InputGroup className="mb-3">
        <div>UserName</div>
        <FormControl
          aria-label="Example text with button addon"
          aria-describedby="basic-addon1"
          // value="Paul@hotmail.com"
          onKeyUp={(e) => setEmail(e.target.value)}
        />
        <div>Password</div>
        <FormControl
          aria-label="Example text with button addon"
          aria-describedby="basic-addon1"
          onKeyUp={(e) => setPassword(e.target.value)}
        />
      </InputGroup>

      <Button onClick={handleSubmit}>login</Button>
      <div>
        not registered? <Link to="/Register">Register Now!</Link>
      </div>
    </div>
  );
};

export default withRouter(Login);
