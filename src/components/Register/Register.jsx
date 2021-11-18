import {
  Button,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";

// import store from '../../redux/store/store.js'
// import { connect } from 'react-redux'
// // import { setUserInfo } from '../action/action.js';

// const mapStateToProps = (state) => ({
//   name: state.userInfo.name,
//   email: state.userInfo.email,
// })

// userInfo: {
//   _id: "",
//   name: "",
//   email: "",
//   avatar: "",

const Register = () => {
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
            />
            <div>Password</div>
            <FormControl
              className="w-100"
              type="password"
              aria-label="Example text with button addon"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <DropdownButton
              variant="outline-secondary"
              title="Dropdown"
              id="input-group-dropdown-1"
            >
              <Dropdown.Item href="#">Action</Dropdown.Item>
              <Dropdown.Item href="#">Another action</Dropdown.Item>
              <Dropdown.Item href="#">Something else here</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#">Separated link</Dropdown.Item>
            </DropdownButton>
            <FormControl aria-label="Text input with dropdown button" />
          </InputGroup>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button onclick="myFunction()">register now</Button>
          <br />
          <div>
            already have an account <Link to="/Login">Login Now!</Link>
          </div>
          <br />
          <div className="d-flex justify-content-between w-50">
            <Button onclick="myFunction()">fboauth</Button>
            <Button onclick="myFunction()">googleoauth</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
