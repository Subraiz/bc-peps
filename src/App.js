import React, { Component } from "react";
import logo from "./logo.svg";
import sidebar from "./assets/Sidebar.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="oceanContainer">
          <div className="ocean">
            <div className="wave" />
            <div className="wave" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
