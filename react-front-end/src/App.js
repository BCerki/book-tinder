import React, { useState, Component } from "react";
import axios from "axios";
import "./App.scss";
import ProfileView from "./Components/ProfileView";
import SwipeView from "./Components/SwipeView";
import NavBar from "./Components/NavBar";
import MiddleView from "./Components/MiddleView";
import ChatView from "./Components/ChatView";

import { values } from "./dummyData/dummyBookData";

export default function App(props) {
  ////Pull in state and functions from custom hook
  // const {
  //   state,
  //   setDay,
  //   bookInterview,
  //   cancelInterview,
  // } = useApplicationData();

  //Navbar state
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    console.log("handleChange fired");
    setValue(newValue);
  };
  console.log("value is", value);
  return (
    <main>
      <section className="view">
        {value === 0 && <SwipeView />}
        {value === 1 && <MiddleView />}
        {value === 2 && <ProfileView />}
      </section>
      <footer>
        <NavBar
          onChange={() => {
            handleChange(value);
          }}
          value={value}
        />
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
