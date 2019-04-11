import React, { Component } from "react";
import Card from "../components/Card";
import posed, { PoseGroup } from "react-pose";

import Fab from "@material-ui/core/Fab";
import Autocomplete from "react-autocomplete";

const items = [
  {
    id: "muller",
    type: "prof",
    name: "Robert Muller",
    firstName: "Robert",
    lastName: "Muller",
    department: "Computer Science",
    rating: 3.8,
    courses: [
      { name: "Computer Science I", id: "CSCI1101" },
      { name: "Computer Science II", id: "CSCI2201" },
      { name: "Algorithms", id: "CSCI3378" },
      { name: "Programming Languages", id: "CSCI3376" }
    ],
    comments: [
      `He is a great person to have teach your class, I honeslty fell in
    love with Computer Science the second day I had him! Cannot
    reccomend him enough!`,
      `I have had way better Professors! DO NOT RECCOMEND!! His problem sets are ridiculously hard for no apparent reason. He needs to ease up!`,
      `Kind of a know it all. Would be a lot better of a class if he actually took a second to explain what he was saying instaed of just rambling on!`
    ]
  },
  {
    id: "ali",
    type: "prof",
    name: "Ratib Ali",
    firstName: "Ratib",
    lastName: "Ali",
    department: "Economics",
    rating: 4.2,
    courses: [
      { name: "Microeconomic Principals", id: "ECON1101" },
      { name: "Macroeconomic Principals", id: "ECON1102" },
      { name: "Microeconomic Theory", id: "ECON2201" },
      { name: "Macroeconomic Theory", id: "ECON2202" }
    ],
    comments: [
      `He is a great person to have teach your class, I honeslty fell in
    love with Computer Science the second day I had him! Cannot
    reccomend him enough!`,
      `I have had way better Professors! DO NOT RECCOMEND!! His problem sets are ridiculously hard for no apparent reason. He needs to ease up!`,
      `Kind of a know it all. Would be a lot better of a class if he actually took a second to explain what he was saying instaed of just rambling on!`
    ]
  },
  {
    id: "ahmed",
    type: "prof",
    name: "Subraiz Ahmed",
    firstName: "Subraiz",
    lastName: "Ahmed",
    department: "Computer Science",
    rating: 5.0,
    courses: [],
    comments: []
  }
];

const Modal = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    delay: 100,
    transition: {
      y: { type: "tween", stiffness: 1000, damping: 15 },
      default: { duration: 400 }
    }
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { duration: 150 }
  }
});

class FrontPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cornerTitle: true,
      value: "",
      searchTerms: [],
      titleStyle: styles.titleStyle,
      searchBarContainerStyle: styles.searchBarContainerStyle,
      professors: []
    };
  }

  componentDidMount = () => {};

  onSearchButtonPress = () => {
    console.log(this.state.value);
  };

  onSearchResultSelect = value => {
    this.setState({ value });
    console.log(value);
  };

  onCardClick(item) {
    this.props.transitionWaves();
    this.setState({ value: item.name });
  }

  reloadData = e => {
    e.preventDefault();
    e.target.value =
      e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    this.setState({ value: e.target.value });
    let searchTerms = [];
    let professors = [];
    if (e.target.value !== "") {
      this.props.collapseWaves();
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
      this.props.expandWaves();
      this.setState({
        titleStyle: styles.titleStyle,
        searchTerms: searchTerms,
        cornerTitle: true,
        searchBarContainerStyle: styles.searchBarContainerStyle
      });
    }

    this.setState({ searchTerms, professors });
  };

  renderCornerTitle = () => {
    if (this.state.cornerTitle) {
      return (
        <a style={styles.infoStyle} href="disabled">
          <p>What is PEPs?</p>
        </a>
      );
    } else {
      return <p className="titleSmall">BC PEPs </p>;
    }
  };

  renderProfessors() {
    return this.state.professors.map(professor => {
      return (
        <Modal key={professor.id}>
          <Card
            professor={professor}
            onClick={this.onCardClick.bind(this, professor)}
          />
        </Modal>
      );
    });
  }

  render() {
    return (
      <div style={styles.body}>
        <div style={styles.headerContainer}>
          <div style={styles.header}>
            {this.renderCornerTitle()}
            <Fab
              variant="extended"
              aria-label="Delete"
              style={{
                color: "black",
                backgroundColor: "white",
                boxShadow: "1px 2px 3px rgba(0,0,0,.3)",
                fontFamily: "Avenir",
                textTransform: "none",
                paddingLeft: "20px",
                paddingRight: "20px"
              }}
            >
              Browse
            </Fab>
            <Fab
              variant="extended"
              aria-label="Delete"
              style={{
                color: "#1e1e1e",
                backgroundColor: "#68E5ED",
                boxShadow: "1px 2px 3px rgba(0,0,0,.3)",
                fontFamily: "Avenir",
                textTransform: "none"
              }}
            >
              Evaluate A Professor
            </Fab>
          </div>
        </div>
        <div style={styles.mainContainer}>
          <p style={this.state.titleStyle}>BC PEPs</p>
          <div style={this.state.searchBarContainerStyle}>
            <Autocomplete
              ref={auto => (this.auto = auto)}
              renderInput={function(props) {
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row"
                    }}
                  >
                    <input
                      placeholder="Search by professor, class, or course code"
                      style={styles.searchBarStyle}
                      {...props}
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
                          fontSize: 18,
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
            <Fab
              onClick={this.onSearchButtonPress}
              variant="extended"
              aria-label="Delete"
              style={{
                color: "white",
                backgroundColor: "#1e1e1e",
                boxShadow: "1px 2px 3px rgba(0,0,0,.3)",
                fontFamily: "Avenir",
                fontSize: 18,
                textTransform: "none",
                marginLeft: "15px",
                paddingLeft: "30px",
                paddingRight: "30px",
                borderRadius: 100,
                height: 64
              }}
            >
              Search
            </Fab>
          </div>
        </div>
        <div style={styles.professorContainer}>
          <PoseGroup>{this.renderProfessors()}</PoseGroup>
        </div>
      </div>
    );
  }
}

const styles = {
  body: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    zIndex: 3,
    top: 0,
    bottom: 0,
    left: 0,
    width: "100vw",
    flexGrow: 1
  },
  header: {
    width: "95%",
    display: "flex",
    justifyContent: "space-between"
  },
  infoStyle: {
    fontFamily: "Avenir",
    color: "black",
    textDecoration: "none",
    fontSize: 16
  },
  headerContainer: {
    marginTop: "30px",
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  mainContainer: {
    marginLeft: "3%",

    width: "100vw"
  },
  menuStyle: {
    borderBottomRightRadius: "20px",
    borderBottomLeftRadius: "20px",
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
    background: "rgba(255, 255, 255, 0.9)",
    marginTop: -25,
    paddingTop: "20px",
    zIndex: -2,
    fontSize: "90%",
    width: "60vw",
    overflow: "auto"
  },
  searchBarStyle: {
    width: "60vw",
    outline: "none",
    color: "white",
    fontFamily: "Avenir",
    fontSize: 24,
    border: "none",
    padding: "15px 30px",
    backgroundColor: "#1e1e1e",
    borderRadius: 40,
    transition: "top .5s ease-in-out",
    zIndex: 2
  },
  titleStyle: {
    fontFamily: "Playfair Display",
    fontWeight: "600",
    fontSize: "124px",
    opacity: 1,
    transition: "opacity .5s ease-in-out .25s"
  },
  hiddenTitleStyle: {
    fontFamily: "Playfair Display",
    fontWeight: "600",
    fontSize: "124px",
    opacity: 0,
    transition: "opacity .5s ease-in-out"
  },
  searchBarContainerStyle: {
    display: "flex",
    flexDirection: "row",
    marginTop: -100,
    transition: "margin-top .5s ease-in-out"
  },
  searchBarContainerStyleExpanded: {
    display: "flex",
    flexDirection: "row",
    marginTop: -400,
    transition: "margin-top .5s ease-in-out .25s"
  },
  professorContainer: {
    marginTop: 20,
    flexGrow: 1,
    overflowY: "scroll",
    paddingBottom: 20,
    paddingLeft: 5,
    overflow: "auto",
    marginLeft: "3%"
  }
};

export default FrontPage;
