import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

import FrontPage from "./containers/FrontPage";
import theme from "./constants/themeVariables";
import "./App.css";

const Ocean = styled.div`
  z-index: -1;
  position: absolute;
  float: right;
  height: 100%;
  width: 100vh;
  margin-left: ${props => (props.open ? "60%" : "85%")};

  background: linear-gradient(
    ${theme.colors.pink1} 0 ${theme.colors.pink2} 100%
  );
  transform: rotate(-90deg);
  transition: margin-left 1s cubic-bezier(0.755, 0.005, 0.49, 1);
`;

const transition = keyframes`
  0% {
    left: -120%;
  }
  25% {
    left: 0%;
  }
  50% {
    left: 0%;
  }
  75% {
    left: 0%;
  }
  100% {
    left: -120%;
  }

`;

const TransitionOcean = styled.div`
  z-index: 5;
  position: absolute;
  float: right;
  height: 100%;
  width: 140vw;
  animation: ${props => (props.transition ? transition : false)} 1.5s linear
  left: -120%;


  background: linear-gradient(
    ${theme.colors.pink1} 0 ${theme.colors.pink2} 100%
  );


  transform: rotate(90deg);
  transition: margin-left 1s cubic-bezier(0.755, 0.005, 0.49, 1);
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      oceanOpen: true,
      transition: false
    };
  }

  collapseWaves = () => {
    this.setState({ oceanOpen: false });
  };

  expandWaves = () => {
    this.setState({ oceanOpen: true });
  };

  transitionWaves = () => {
    this.setState({ transition: true });
    setTimeout(() => {
      this.setState({ transition: false });
    }, 1500);
  };

  render() {
    return (
      <div className="App">
        <Ocean open={this.state.oceanOpen}>
          <div className="wave" />
          <div className="wave" />
        </Ocean>

        <TransitionOcean transition={this.state.transition}>
          <div className="transition-wave" />
        </TransitionOcean>
        <FrontPage
          collapseWaves={this.collapseWaves}
          expandWaves={this.expandWaves}
          transitionWaves={this.transitionWaves}
        />
      </div>
    );
  }
}

export default App;
