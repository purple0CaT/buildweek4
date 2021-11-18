import { InputGroup, Button, FormControl, DropdownButton, Dropdown, FormGroup, Form } from "react-bootstrap";
import './Login.css'
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { useState } from 'react'
import { setUserInfo } from '../../redux/actions/action.js'
import { withRouter } from 'react-router-dom'

//const user = useSelector((state) => state.userInfo);


// Const dispatch= useDispatch()
// dispatch(setuserinfo(fetchedPerson))
// { user:”userinfo”, accessToken:”token” }
// Const history= useHistory()
// History.push(‘/main/userID”)


//   onClick={this.handleSubmit}

const Login = ({ history }) => {
  // const user = useSelector((state) => state.userInfo)
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async e => {
    e.preventDefault()
    console.log("hello world")
    const userObject = { username, password }
    dispatch(setUserInfo(userObject))
    console.log(userObject)
  }

  return <div>


    <InputGroup className="mb-3">
      <div>UserName</div>
      <FormControl
        aria-label="Example text with button addon"
        aria-describedby="basic-addon1"
        onKeyUp={e => setUserName(e.target.value)}
      />
      <div>Password</div>
      <FormControl
        aria-label="Example text with button addon"
        aria-describedby="basic-addon1"
        onKeyUp={e => setPassword(e.target.value)}
      />
    </InputGroup>




    <Button onClick={handleSubmit}>login</Button>
    <div>not registered? <Link to='/Register'>Register Now!</Link></div>

  </div>
};

export default withRouter(Login);
