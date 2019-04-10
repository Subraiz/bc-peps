import React, { Component } from "react";
import styled from 'styled-components';

import FrontPage from "./containers/FrontPage";
import theme from "./constants/themeVariables";
import "./App.css";

const Ocean = styled.div `
    z-index: -1;
    position: absolute;
    float: right;
    height: 100%;
    width: 100vh;
    margin-left: ${props => props.open ? '60%' : '85%'};

    background: linear-gradient(${theme.colors.pink1} 0 ${theme.colors.pink2} 100%);
    transform: rotate(-90deg);
    transition: margin-left 1s cubic-bezier(0.755, 0.005, 0.490, 1.000);
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      oceanOpen: true
    };
  }

  collapseWaves = () => {
    this.setState({ oceanOpen: false });
  }

  expandWaves = () => {
    this.setState({ oceanOpen: true });
  }

  render() {
    return (
      <div className="App">
        <Ocean open={this.state.oceanOpen}>
          <div className="wave" />
          <div className="wave" />
        </Ocean>
        <FrontPage
          collapseWaves={this.collapseWaves}
          expandWaves={this.expandWaves}
        />
      </div>
    );
  }
}

export default App;
