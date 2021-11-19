import { useState } from "react";
import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { setUserInfo } from "../../redux/actions/action.js";

const Register = () => {
  const [Credentials, setCredentials] = useState({
    email: "",
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();
  //
  const sendCredentials = async () => {
    console.log("Send!");
    try {
      const url = `${process.env.REACT_APP_FETCHURL}/users/account`;
      const res = await fetch(url, {
        method: "POST",
        withCredentials: true,
        credentials: "include",
        body: JSON.stringify(Credentials),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        dispatch(setUserInfo(data.newUser));
        history.push(`/main/${data.newUser._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <br />
      <Row>
        <Col
          xs="8"
          className="d-flex flex-column align-items-center justify-content-between text-white mx-auto"
        >
          <InputGroup className="mb-3 d-flex flex-column align-items-center justify-content-between text-white">
            <div>Your Name</div>
            <FormControl
              id="search-input"
              type="text"
              placeholder="Search"
              value={Credentials.username}
              onChange={(e) =>
                setCredentials({ ...Credentials, username: e.target.value })
              }
              style={{ backgroundColor: "#222", color: "#aaa", width: "100%" }}
              aria-label="Example text with button addon"
              aria-describedby="basic-addon1"
              // value={this.state.userInfo.name}
              // onChange={e => this.setState({ name: e.target.value })}
            />
            {/* <FormControl
              aria-label="Example text with button addon"
              aria-describedby="basic-addon1"
            /> */}
          </InputGroup>
          <InputGroup className="mb-3 d-flex flex-column align-items-center justify-content-between text-white">
            <div>Email</div>
            <FormControl
              className="w-100"
              aria-label="Example text with button addon"
              aria-describedby="basic-addon1"
              value={Credentials.email}
              onChange={(e) =>
                setCredentials({ ...Credentials, email: e.target.value })
              }
            />
            <div>Password</div>
            <FormControl
              className="w-100"
              type="password"
              aria-label="Example text with button addon"
              aria-describedby="basic-addon1"
              value={Credentials.password}
              onChange={(e) =>
                setCredentials({ ...Credentials, password: e.target.value })
              }
            />
          </InputGroup>
          <Button onClick={sendCredentials}>register now</Button>
          <br />
          <div>
            already have an account <Link to="/Login">Login Now!</Link>
          </div>
          <br />
          <div className="d-flex justify-content-between w-50">
            {/* <Button onclick="myFunction()">fboauth</Button> */}
            <a
              href={`${process.env.REACT_APP_FETCHURL}/auth/googleLogin`}
              className="btn btn-info my-1"
            >
              Login with Google
            </a>{" "}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
