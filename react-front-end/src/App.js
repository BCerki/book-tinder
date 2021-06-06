import React, { Component } from "react";
import axios from "axios";
import "./App.scss";
import ProfileView from "./Components/ProfileView";
import SwipeView from "./Components/SwipeView";
import NavBar from "./Components/NavBar";
import MiddleView from "./Components/MiddleView";
import ChatView from "./Components/ChatView";
import useView from "./Hooks/useView";

export default function App() {
  const { mode, transition } = useView(0);
  return (
    <main>
      <section className="view">
        {mode === 0 && <SwipeView />}
        {mode === 1 && <MiddleView />}
        {mode === 2 && <ProfileView />}
      </section>
      <footer>
        <NavBar />
      </footer>
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
