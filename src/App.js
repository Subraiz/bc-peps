import React, { Component } from "react";
import FrontPage from "./FrontPage";
import "./App.css";

class App extends Component {
  state = {
    oceanStyle: styles.oceanStyle
  };

  collapseWaves() {
    this.setState({ oceanStyle: styles.collapsedOceanStyle });
  }

  expandWaves() {
    this.setState({ oceanStyle: styles.oceanStyle });
  }

  render() {
    return (
      <div className="App">
        <div style={this.state.oceanStyle}>
          <div className="wave" />
          <div className="wave" />
        </div>
        <FrontPage
          collapseWaves={this.collapseWaves.bind(this)}
          expandWaves={this.expandWaves.bind(this)}
        />
      </div>
    );
  }
}

const styles = {
  oceanStyle: {
    float: "right",
    height: "100%",
    width: "100vh",
    position: "absolute",
    background: "linear-gradient(#fbb69d 0%, #f4d4bd 100%)",
    transform: "rotate(-90deg)",
    marginLeft: "60%",
    transition: "margin-left 1s ease-in-out",
    zIndex: "-1"
  },
  collapsedOceanStyle: {
    float: "right",
    height: "100%",
    width: "100vh",
    position: "absolute",
    background: "linear-gradient(#fbb69d 0%, #f4d4bd 100%)",
    transform: "rotate(-90deg)",
    marginLeft: "100%",
    transition: "margin-left 1s ease-in-out",
    zIndex: "-1"
  }
};

export default App;
