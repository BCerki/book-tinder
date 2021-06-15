import React from "react";
import { useState, useContext } from "react";
import bookupLogo from "./bookupLogo.png";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

//Styling
import "../styles/login.scss";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailChange = function(event) {
    setEmail(event.target.value);
  };

  const onPasswordChange = function(event) {
    setPassword(event.target.value);
  };

  const onSubmit = function(event) {
    event.preventDefault();
  };

  return (
    <div className={"page"}>
      <div className={"login"}>
        <div className={"appName"}>bookUp</div>
        <img className={"logo"} src={bookupLogo} alt="bookUp logo" />
        <div className={"formFields"}>
          <form onSubmit={onSubmit}>
            <div>
              <input
                type="text"
                name="login"
                value={email}
                placeholder="Username"
                onChange={onEmailChange}
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={onPasswordChange}
              />
            </div>
            <div className="submit">
              <Link to="/credits">
                <input type="submit" name="commit" value="Login" />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
