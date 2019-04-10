import React, { Component } from "react";
import Fab from "@material-ui/core/Fab";
import Autocomplete from "react-autocomplete";

const items = [
  { id: "apple", label: "apple" },
  { id: "bannana", label: "banana" },
  { id: "pear", label: "pear" },
  { id: "apple1", label: "apple pie" },
  { id: "apple2", label: "apple slices" },
  { id: "pear", label: "pear" }
];

class FrontPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cornerTitle: true,
      value: "",
      searchTerms: [],
      titleStyle: styles.titleStyle,
      searchBarContainerStyle: styles.searchBarContainerStyle
    };
  }

  componentDidMount() {}

  onSearchButtonPress() {
    console.log(this.state.value);
  }

  onSearchResultSelect(value) {
    this.setState({ value });
    console.log(value);
  }

  reloadData(e) {
    this.setState({ value: e.target.value });
    let searchTerms = [];
    if (e.target.value != "") {
      this.props.collapseWaves();
      this.setState({
        titleStyle: styles.hiddenTitleStyle,
        cornerTitle: false,
        searchBarContainerStyle: styles.searchBarContainerStyleExpanded
      });
      let itemCount = 0;
      items.some(item => {
        // Max of 4 items to be displayed
        if (itemCount == 4) {
          return true;
        }
        if (item.label.toLowerCase().includes(e.target.value.toLowerCase())) {
          searchTerms.push(item);
          itemCount++;
        }
      });
      searchTerms.push({
        id: "search-term",
        label: `Search "${e.target.value}"`
      });
    } else {
      this.props.expandWaves();
      this.setState({
        titleStyle: styles.titleStyle,
        cornerTitle: true,
        searchBarContainerStyle: styles.searchBarContainerStyle
      });
    }

    this.setState({ searchTerms });
  }

  renderCornerTitle() {
    if (this.state.cornerTitle) {
      return (
        <a style={styles.infoStyle} href="">
          <p>What is PEPs?</p>
        </a>
      );
    } else {
      return <p className="titleSmall">BC PEPs </p>;
    }
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
              getItemValue={item => item.label}
              renderItem={(item, highlighted) => {
                item.label =
                  item.label.charAt(0).toUpperCase() + item.label.slice(1);
                if (item.id == "search-term") {
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
                        {item.label}
                      </p>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={item.id}
                      style={{
                        backgroundColor: highlighted ? "#eee" : "transparent",
                        paddingLeft: "20px"
                      }}
                    >
                      <p style={{ fontSize: 18, fontFamily: "Avenir" }}>
                        {item.label}
                      </p>
                    </div>
                  );
                }
              }}
              value={this.state.value}
              onChange={this.reloadData.bind(this)}
              onSelect={this.onSearchResultSelect.bind(this)}
            />
            <Fab
              onClick={this.onSearchButtonPress.bind(this)}
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
      </div>
    );
  }
}

const styles = {
  body: {
    height: "100vh",
    width: "100vw",
    zIndex: 3
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
    marginLeft: "3%"
  },
  menuStyle: {
    borderBottomRightRadius: "20px",
    borderBottomLeftRadius: "20px",
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
    background: "rgba(255, 255, 255, 0.9)",
    marginTop: -25,
    paddingTop: "40px",
    paddingBottom: "30px",
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
  }
};

export default FrontPage;
