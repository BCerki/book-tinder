import React, { useState, useContext } from "react";
import UserStateProvider from "./providers/UserStateProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Import components
import ProfileView from "./Components/ProfileView";
import SwipeView from "./Components/SwipeView";
import ChatView from "./Components/ChatView";
import BooksView from "./Components/BooksView";
import Footer from "./Components/Footer";

//Import styling

import "./App.scss";

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/books/:book">
          <ChatView />
        </Route>
        <Route path="/books">
          <BooksView />
          <Footer />
          <Route path="/profile/:id">
            <UserStateProvider>
              <ProfileView />
            </UserStateProvider>
            <Footer />
          </Route>
        </Route>
        <Route path="/profile">
          <UserStateProvider>
            <ProfileView />
          </UserStateProvider>
          <Footer />
        </Route>
        <Route path="/">
          <SwipeView />
          <Footer />
        </Route>
      </Switch>
    </Router>
  );
}
