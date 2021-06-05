import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import ProfileView from "./Components/ProfileView";
import SwipeView from "./Components/SwipeView";
import NavBar from "./Components/NavBar";
import MiddleView from "./Components/MiddleView";
import ChatView from "./Components/ChatView";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Click the button to load data!",
    };
  }

  fetchData = () => {
    axios
      .get("/api/data") // You can simply make your requests to "/api/whatever you want"
      .then((response) => {
        // handle success
        console.log(response.data); // The entire response from the Rails API

        console.log(response.data.message); // Just the message
        this.setState({
          message: response.data.message,
        });
      });
  };

  render() {
    return (
      <main>
        <div className="App">
          <h1>{this.state.message}</h1>
          <button onClick={this.fetchData}>Fetch Data</button>
        </div>
        <section>
          This is the nav component:
          <NavBar />
        </section>
        <section>
          This is the profile view:
          <ProfileView />
        </section>

        <section>
          this is the middle view:
          <MiddleView />
        </section>
        <section>
          this is the ChatBot view:
          <ChatView />
        </section>
        <section>
          this is the Swipe view:
          <br />
          <SwipeView />
        </section>
      </main>
    );
  }

  // render() {
  //   return (
  //     <div>
  //       <SimpleForm />
  //     </div>
  //   );
  // }
}
export default App;
