import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ProfileView from "./Components/ProfileView";
import classNames from "classnames";

import SwipeView from "./Components/SwipeView";
import NavBar from "./Components/NavBar";
import MiddleView from "./Components/MiddleView";
import Footer from "./Components/Footer";

export default function App() {
  // State and handlers for the nav bar
  // const [value, setValue] = useState(0);
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  //Styling
  // let mainClass = classNames(
  //   { swipe: value === 0 },
  //   { middle: value === 1 },
  //   { profile: value === 2 }
  // );
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/middle">Book</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav> */}

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/middle">
            <MiddleView />
          </Route>
          <Route path="/profile">
            <ProfileView />
          </Route>
          <Route path="/">
            <SwipeView />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}
