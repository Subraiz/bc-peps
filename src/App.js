import React, { Component } from "react";
import FrontPage from "./FrontPage";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="ocean">
          <div className="wave" />
          <div className="wave" />
        </div>
        <FrontPage />
      </div>
    );
  }
}

export default App;
