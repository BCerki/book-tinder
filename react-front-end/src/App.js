import React, { useState, useContext } from "react";
import UserStateProvider from "./providers/UserStateProvider";
import ChatBookStateProvider from "./providers/ChatBookStateProvider";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Import components
import ProfileView from "./Components/ProfileView";
import SwipeView from "./Components/SwipeView";
import ChatView from "./Components/ChatView";
import MatchesView from "./Components/MatchesView";
import Footer from "./Components/Footer";
import Login from "./Components/Login";

//Import styling

import "./App.scss";
import BookStateProvider from "./providers/BookStateProvider";

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/matches/:id">
          <ChatView />
        </Route>
        <Route path="/matches">
          <MatchesView />

          <Footer />
          <Route path="/profile/:id">
            <ProfileView />
            <Footer />
          </Route>
        </Route>
        <Route path="/profile">
          <ProfileView />

          <Footer />
        </Route>
        <Route path="/books">
          <SwipeView />
          <Footer />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}
