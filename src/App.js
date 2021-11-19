import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Main from "./components/Main/Main";
import { useHistory } from "react-router";
import { useEffect } from "react";

function App() {
  // const history = useHistory();
  // useEffect(() => {
  //   history.push("/login");
  // }, []);
  return (
    <Router>
      <Route path="/Login" exact component={Login} />
      <Route path="/Register" exact component={Register} />
      <Route path="/Main/:id" component={Main} />
    </Router>
  );
}

export default App;
