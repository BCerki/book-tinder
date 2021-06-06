import React, { useState, Component } from "react";
import axios from "axios";
import "./App.scss";
import ProfileView from "./Components/ProfileView";
import SwipeView from "./Components/SwipeView";
import NavBar from "./Components/NavBar";
import MiddleView from "./Components/MiddleView";
import ChatView from "./Components/ChatView";

import { values } from "./dummyData/dummyBookData";
import classNames from "classnames";

export default function App(props) {
  //State and handlers for the nav bar
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //Styling
  let mainClass = classNames(
    { swipe: value === 0 },
    { middle: value === 1 },
    { profile: value === 2 }
  );
  return (
    <>
      <main className={mainClass}>
        {value === 0 && <SwipeView />}
        {value === 1 && <MiddleView />}
        {value === 2 && <ProfileView />}
      </main>
      <footer>
        <NavBar onChange={handleChange} value={value} />
      </footer>
    </>
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
