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
import BookStateProvider from "./providers/BookStateProvider";

export default function AppRouter() {
  return (
    <UserStateProvider>
      <Router>
        <Switch>
          <Route path="/matches/:id">
            <BookStateProvider>
              <ChatView />
            </BookStateProvider>
          </Route>
          <Route path="/matches">
            <BookStateProvider>
              <BooksView />
            </BookStateProvider>
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
        </Switch>
      </Router>
    </UserStateProvider>
  );
}
