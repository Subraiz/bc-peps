import React, { Component } from "react";
import { FaChevronCircleDown } from "react-icons/fa";
import styled from "styled-components";

const Expandable = styled.div`
  display: ${props => (props.open ? "visible" : "none")};
`;

const AnimatedIcon = styled.div`
  transform: ${props => (props.open ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.25s ease-in-out;
  background-color: "#1e1e1e";
`;

export default class Accordion extends Component {
  state = {
    open: false
  };

  renderComments() {
    if (this.props.course.comments.length === 0) {
      return (
        <p
          style={{
            padding: "10px 20px",
            textAlign: "center",
            fontFamily: "Avenir",
            fontWeight: "200"
          }}
        >
          There aren't any reviews for this course yet. If you have taken this
          course feel free to add one.
        </p>
      );
    }
    return this.props.course.comments.map(comment => {
      return (
        <p
          style={{
            padding: "10px 20px",
            textAlign: "center",
            fontFamily: "Avenir",
            fontWeight: "200"
          }}
        >
          <span>"</span>
          {comment}
          <span>"</span>
        </p>
      );
    });
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          borderRadius: 50,
          marginBottom: "1%",
          overflow: "hidden",
          boxShadow: "-1px 1px 3px rgba(0,0,0,.3)"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "15px 25px",
            zIndex: 1,
            alignItems: "center",
            fontFamily: "Avenir",
            fontWeight: "700",
            overflow: "hidden"
          }}
          onClick={() => {
            this.setState({ open: !this.state.open });
            console.log("Clicked");
          }}
        >
          <div>{this.props.course.name}</div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <div style={{ marginRight: "5px" }}>
              {this.props.course.rating.toFixed(2) || "N/A"}
            </div>
            <AnimatedIcon open={this.state.open}>
              <FaChevronCircleDown
                color="#86e5ed"
                style={{ marginTop: 4 }}
                size={20}
              />
            </AnimatedIcon>
          </div>
        </div>
        <Expandable open={this.state.open}>
          <div
            style={{
              borderTopWidth: 1,
              borderTopColor: "#919191",
              backgroundColor: "#efefef"
            }}
          >
            {this.renderComments()}
          </div>
        </Expandable>
      </div>
    );
  }
}
