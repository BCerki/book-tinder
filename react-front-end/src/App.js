import React, { Component } from "react";
import axios from "axios";
import "./App.css";
// import SimpleForm from "./components/chatbot/SimpleForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      message: "Click the button to load data right now!",
    };
  }

  fetchData = () => {
    axios
      .get("/api/test") // You can simply make your requests to "/api/whatever you want"
      .then((response) => {
        // console.log("LOG: response:", response);
        this.setState({
          books: response.data,
        });
      });
  };

  render() {
    return (
      <div className="App">
        <h1>{this.state.message}</h1>
        <div>{JSON.stringify(this.state.books)}</div>
        <button onClick={this.fetchData}>Fetch Data</button>
      </div>
    );
  }

  // Chatbot code
  // render() {
  //   return (
  //     <div>
  //       <SimpleForm />
  //     </div>
  //   );
  // }
}
export default App;
