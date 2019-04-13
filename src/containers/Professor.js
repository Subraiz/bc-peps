import React, { Component } from "react";
import styled from "styled-components";
import { items } from "../constants/items";

import Fab from "@material-ui/core/Fab";
import Autocomplete from "react-autocomplete";
import { FaSearch } from "react-icons/fa";
import Accordion from "../components/Accordion";

const ProfessorContainer = styled.div`
  width: 93%;
  height: 200vh;
  display: flex;
  align-items: flex-start;
  margin: 0 auto;
  flex-direction: column;
  flex-grow: 1;

  .header {
    display: flex;
    width: 93%;
    justify-content: space-between;
    align-items: center;
    margin-top: -25px;
    position: fixed;
    background-color: white;
    height: 20%;
    z-index: 10;
  }

  .fab {
    color: black;
    background-color: white;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3);
    font-family: "Avenir";
    text-transform: none;
    padding-left: 30px;
    padding-right: 30px;
    margin-left: 5%;
  }

  .pepsTitle {
    font-family: "Playfair Display";
    font-weight: 600;
    font-size: 72px;
  }

  .searchBar {
    display: flex;
    flex-direction: row;
  }

  .mainContent {
    display: flex;
    fled-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-top: 10%;
  }

  .profInfoContainer {
    width: 70%;
    height: 200px;
    margin-left: 1.5%;
    display: flex;
    flex-direction: column;
  }

  .profNameContainer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: -5%;
    align-items: center;
  }

  .profName {
    font-family: "Playfair Display";
    font-size: 56px;
    font-weight: 500;
  }

  .profDepartment {
    font-family: "Avenir";
    font-size: 20px;
    color: #919191;
    font-weight: 300;
  }

  .evaluation {
    color: #1e1e1e;
    background-color: #68e5ed;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3);
    font-family: "Avenir";
    font-size: 18px;
    padding-top: 3px;
    text-transform: none;
    width: 20%;
    font-weight: 200;
  }

  .coursesContainer {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: -5%;
  }

  .courseHeading {
    font-family: "Playfair Display";
    font-size: 30px;
    font-weight: 500;
  }

  .courseLength {
    font-family: "Avenir";
    font-size: 20px;
    font-weight: 300;
  }

  .courses {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .accordion {
    width: 46%;
    margin-bottom: 1%;
    padding: 10px 15px;
    border-radius: 50px;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3);
    font-family: "Avenir";
    background-color: "red";
  }

  .accordionItemButton {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-weight: 700;
  }

  .ratingContainer {
    width: 100px;
    height: 100px;
    background-color: blue;
    margin-right: 1.5%;
  }

  .sidebar {
    background: linear-gradient(#f0c4ae, white);
    position: fixed;
    right: 0;
    width: 2%;
    height: 100vh;
    z-index: 12;
  }

  .unselectable {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
`;

class Professor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerms: [],
      value: "",
      professors: []
    };
  }

  reloadData = e => {
    e.preventDefault();
    e.target.value =
      e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    this.setState({ value: e.target.value });
    let searchTerms = [];
    let professors = [];
    if (e.target.value !== "") {
      this.setState({
        titleStyle: styles.hiddenTitleStyle,
        cornerTitle: false,
        searchBarContainerStyle: styles.searchBarContainerStyleExpanded
      });
      let itemCount = 0;
      items.some(item => {
        if (itemCount === 5) {
          return true;
        }
        if (item.name.toLowerCase().includes(e.target.value.toLowerCase())) {
          if (item.type === "prof") {
            professors.push(item);
          }
          searchTerms.push(item);
          itemCount++;
        } else {
          item.courses.some(course => {
            if (
              course.name
                .toLowerCase()
                .includes(e.target.value.toLowerCase()) ||
              course.id.toLowerCase().includes(e.target.value.toLowerCase())
            ) {
              if (item.type === "prof") {
                professors.push(item);
              }
              searchTerms.push(item);
              return true;
            }
            return false;
          });
        }

        return false;
      });
      let lastItem = { id: "search-term", name: `Search "${e.target.value}"` };
      searchTerms.push(lastItem);
    } else {
      this.setState({
        titleStyle: styles.titleStyle,
        searchTerms: searchTerms,
        cornerTitle: true,
        searchBarContainerStyle: styles.searchBarContainerStyle
      });
    }

    this.setState({ searchTerms, professors });
  };

  renderCourses() {
    return this.props.professor.courses.map((course, index) => {
      return <Accordion course={course} key={index} />;
    });
  }

  render() {
    let professorName = "Prof. " + this.props.professor.name.split(" ")[1];
    let department = this.props.professor.department;

    return (
      <ProfessorContainer>
        <div className="sidebar" />
        <div className="header">
          <p className="pepsTitle unselectable">BC PEPs</p>
          <Fab className="fab" variant="extended" aria-label="Delete">
            Browse
          </Fab>
          <Autocomplete
            ref={auto => (this.auto = auto)}
            renderInput={function(props) {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: "22.5px"
                  }}
                >
                  <input
                    placeholder="Search"
                    style={styles.searchBarStyle}
                    {...props}
                  />
                  <FaSearch
                    size={22}
                    color="white"
                    style={{ marginLeft: -45, zIndex: 3 }}
                  />
                </div>
              );
            }}
            menuStyle={styles.menuStyle}
            items={this.state.searchTerms}
            getItemValue={item => item.name}
            renderItem={(item, highlighted) => {
              item.name =
                item.name.charAt(0).toUpperCase() + item.name.slice(1);
              if (item.id === "search-term") {
                return (
                  <div style={{ paddingLeft: "20px" }} key={item.id}>
                    <div
                      style={{
                        width: "97%",
                        alignSelf: "center",
                        height: 0.8,
                        backgroundColor: "rgba(0,0,0,.4)"
                      }}
                    />
                    <p
                      style={{
                        fontSize: 15,
                        fontFamily: "Avenir",
                        color: "grey"
                      }}
                    >
                      {item.name}
                    </p>
                  </div>
                );
              } else {
                let prefix = "";
                if (item.type === "prof") {
                  prefix = "Prof.";
                } else if (item.type === "course") {
                  prefix = "Course:";
                }
                return (
                  <div
                    key={item.id}
                    style={{
                      backgroundColor: highlighted ? "#eee" : "transparent",
                      paddingLeft: "20px"
                    }}
                  >
                    <p style={{ fontSize: 18, fontFamily: "Avenir" }}>
                      {`${prefix} ${item.name}`}
                    </p>
                  </div>
                );
              }
            }}
            value={this.state.value}
            onChange={this.reloadData}
            onSelect={this.onSearchResultSelect}
          />
        </div>
        <div className="mainContent">
          <div className="profInfoContainer">
            <div className="profNameContainer">
              <p className="profName">
                {professorName}{" "}
                <span className="profDepartment" style={styles.profDepartment}>
                  {department}
                </span>
              </p>
              <Fab
                variant="extended"
                aria-label="Delete"
                className="evaluation"
              >
                Submit Evaluation
              </Fab>
            </div>
            <div className="coursesContainer">
              <p className="courseHeading">
                Courses{" "}
                <span className="courseLength">
                  ({this.props.professor.courses.length})
                </span>
              </p>
              <div className="courses">{this.renderCourses()}</div>
              <p
                style={{
                  fontFamily: "Avenir",
                  fontWeight: "200",
                  fontSize: 13,
                  alignSelf: "flex-end",
                  marginRight: "2%"
                }}
              >
                Select a course to see course specific reviews
              </p>
              <div
                style={{
                  width: "97%",
                  alignSelf: "center",
                  height: 1,
                  backgroundColor: "rgba(0,0,0,.5)"
                }}
              />
            </div>
          </div>
          <div className="ratingContainer" />
        </div>
      </ProfessorContainer>
    );
  }
}

const styles = {
  menuStyle: {
    borderBottomRightRadius: "20px",
    borderBottomLeftRadius: "20px",
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
    background: "rgba(255, 255, 255, 0.9)",
    marginTop: -25,
    paddingTop: "20px",
    zIndex: 1,
    fontSize: "90%",
    width: "22vw",
    position: "fixed",
    overflow: "auto"
  },
  searchBarStyle: {
    width: "22vw",
    outline: "none",
    color: "white",
    fontFamily: "Avenir",
    fontSize: 18,
    border: "none",
    padding: "10px 30px",
    backgroundColor: "#1e1e1e",
    borderRadius: 40,
    transition: "top .5s ease-in-out",
    zIndex: 2
  }
};

export default Professor;
