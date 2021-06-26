import React, { useState, useContext } from "react";

import { CSSTransition, TransitionGroup } from "react-transition-group";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Import components
import ProfileView from "./Components/ProfileView";
import SwipeView from "./Components/SwipeView";
import ChatView from "./Components/ChatView";
import MatchesView from "./Components/MatchesView";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import Credits from "./Components/Credits";

//Import styling

import "./App.scss";

export default function AppRouter() {
  return (
    <Router>
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition timeout={900} key={location.key} classNames="fade">
              <Switch location={location}>
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
                <Route path="/credits">
                  <Credits />
                </Route>
                <Route path="/">
                  <Login />
                </Route>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </Router>
  );
}
