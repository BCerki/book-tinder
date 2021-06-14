import React from "react";
import { useState, useContext } from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
    <div className="login">
      <form onSubmit={onSubmit}>
        <p>
          <input
            type="text"
            name="login"
            value={email}
            placeholder="Username"
            onChange={onEmailChange}
          />
        </p>
        <p>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={onPasswordChange}
          />
        </p>
        <p className="submit">
          <Link to="/books">
            <input type="submit" name="commit" value="Login" />
          </Link>
        </p>
      </form>
    </div>
  );
}