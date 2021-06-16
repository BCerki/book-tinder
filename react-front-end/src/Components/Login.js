import React, { useEffect } from "react";
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
import Credits from "./Credits";

//Styling
import "../styles/login.scss";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [credits, showCredits] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (credits) {
      setTimeout(() => {
        setFinished(true);
      }, 3000);
    }
  }, [credits]);

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
      <main>
        <div className={"login"}>
          <div className={"appName"}>bookUp</div>
          <img className={"logo"} src={bookupLogo} alt="bookUp logo" />
          <div className={"formFields"}>
            {/* <form onSubmit={onSubmit}> */}
            <div className="input">
              <TextField
                label="Email"
                id="outlined-margin-none"
                defaultValue={"d.juan.seeks.liason@aol.com"}
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
              <input
                className={"loginButton"}
                type="submit"
                name="commit"
                value="Login"
                onClick={onSubmit}
              />
            </div>
            {/* </form> */}
          </div>
        </div>
      </main>
    );
  }
  if (finished) {
    return <Redirect to="/profile" />;
  }
  return <Credits />;
}
