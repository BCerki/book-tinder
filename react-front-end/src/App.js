import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import SimpleForm from "./Components/chatbot/SimpleForm";
import User from "./Components/User";
import PriceSlider from "./Components/User/PriceSlider";
import PageCountSlider from "./Components/User/PageCountSlider";
import LocationSlider from "./Components/User/LocationSlider";
import MaturityToggle from "./Components/User/MaturityToggle";
import NavBar from "./Components/NavBar";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

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
          This is the user component:
          <User />
        </section>
        <section>
          This is the nav component:
          <NavBar />
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
