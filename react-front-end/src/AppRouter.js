import React, { useState } from "react";
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
      <main>
        <Switch>
          <Route path="/middle/:book">
            <ChatView />
          </Route>
          <Route path="/middle">
            <BooksView />
          </Route>
          <Route path="/profile">
            <ProfileView />
          </Route>
          <Route path="/">
            <SwipeView />
          </Route>
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}
