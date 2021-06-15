import React from "react";
import { useState, useContext } from "react";
import bookupLogo from "./bookupLogo.png";
import TextField from "@material-ui/core/TextField";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Tagline from "./Tagline";

//Styling
import "../styles/login.scss";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [credits, showCredits] = useState(false);

  // const onEmailChange = function(event) {
  //   setEmail(event.target.value);
  // };

  // const onPasswordChange = function(event) {
  //   setPassword(event.target.value);
  // };

  const onSubmit = function(event) {
    event.preventDefault();
    showCredits(true);
  };
  if (!credits) {
    return (
      <div className={"page"}>
        <div className={"login"}>
          <div className={"appName"}>bookUp</div>
          <img className={"logo"} src={bookupLogo} alt="bookUp logo" />
          <div className={"formFields"}>
            {/* <form onSubmit={onSubmit}> */}
            <div className="input">
              <TextField
                label="Email"
                id="outlined-margin-none"
                defaultValue={"djuanseeksliason@aol.com"}
                variant="outlined"
                fullWidth={true}
              />
            </div>
            <div className="input">
              <TextField
                label="Password"
                id="outlined-margin-none"
                defaultValue={"•••••"}
                variant="outlined"
                fullWidth={true}
              />
            </div>
            <div className="submit">
              <Link to="/credits">
                <input type="submit" name="commit" value="Login" />
              </Link>
            </div>
            {/* </form> */}
          </div>
        </div>
      </div>
    );
  }
  return <Tagline />;
}
