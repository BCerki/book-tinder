import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import SimpleForm from "./Components/chatbot/SimpleForm";
import AgeSlider from "./Components/User/AgeSlider";
import PriceSlider from "./Components/User/PriceSlider";
import PageCountSlider from "./Components/User/PageCountSlider";
import LocationSlider from "./Components/User/LocationSlider";
import MaturityToggle from "./Components/User/MaturityToggle";
import NavBar from "./Components/NavBar";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

//Chip functions
const handleDelete = () => {
  console.info("You clicked the delete icon.");
};

const handleClick = () => {
  console.info("You clicked the Chip.");
};

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
          <Avatar />
        </section>
        <section>
          <AgeSlider />
        </section>
        <section>
          <PriceSlider />
        </section>
        <section>
          <PageCountSlider />
        </section>
        <section>
          <LocationSlider />
        </section>
        <section>
          <MaturityToggle />
        </section>
        <section>
          <Chip
            // icon={<FaceIcon />}
            label="Genre"
            onClick={handleClick}
            onDelete={handleDelete}
          />
        </section>
        <section>
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
