import React, { Component } from "react";
import axios from "axios";
import "./App.scss";
import ProfileView from "./Components/ProfileView";
import SwipeView from "./Components/SwipeView";
import NavBar from "./Components/NavBar";
import MiddleView from "./Components/MiddleView";
import ChatView from "./Components/ChatView";

export default function App() {
  return (
    <main>
      <section></section>
      <footer>
        This is the nav component:
        <NavBar />
      </footer>
      <section>
        this is the ChatBot view:
        <ChatView />
      </section>
    </main>
  );
}

// fetchData = () => {
//   axios
//     .get("/api/data") // You can simply make your requests to "/api/whatever you want"
//     .then((response) => {
//       // handle success
//       console.log(response.data); // The entire response from the Rails API

//       console.log(response.data.message); // Just the message
//       this.setState({
//         message: response.data.message,
//       });
//     });
// };

// <div className="App">
//           <h1>{this.state.message}</h1>
//           <button onClick={this.fetchData}>Fetch Data</button>
//         </div>
