import React from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import { FaQuoteLeft } from "react-icons/fa";

const CardContainer = styled.div`
  width: 60%;
  padding: 15px 35px;
  background-color: white;
  border-radius: 50px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin-top: 15px;
  cursor: pointer;

  .unselectable {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

  .rating {
    font-size: 42px;
    font-family: "Avenir";
    font-weight: 900;
    margin-left: 10px;
    padding-top: 10px;
  }

  .lineContainer {
    width: 100%;
    z-index: 3;
    display: flex;
    justify-content: center;
  }

  .line {
    width: 90%;
    height: 1px;
    background-color: #dddddd;
  }

  .commentsContainer {
    display: flex;
    justify-content: space-between;
  }

  .comment {
    display: flex;
    align-items: center;
  }

  .noComment {
    text-overflow: ellipsis
    font-family: "Avenir";
    color: #1e1e1e;
    font-size: 15px;
    display: -webkit-box;
    overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  }

  .commentText {
    margin-left: 10px;
    width: 15vw;
    text-overflow: ellipsis
    font-family: "Avenir";
    color: #1e1e1e;
    font-size: 15px;
    display: -webkit-box;
    overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfessorInformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-item: center;
`;

const Card = props => {
  function renderComments() {
    let previewComments = props.professor.comments.slice(0, 3);
    if (previewComments.length === 0) {
      return (
        <p className="noComment">
          This professor does not have any evaluations yet. Leave a review if
          you have had them.
        </p>
      );
    } else {
      return previewComments.map((comment, index) => {
        return (
          <div className="comment" key={`comment + ${index}`}>
            <FaQuoteLeft color="#1e1e1e" />
            <p className="commentText">{comment}</p>
          </div>
        );
      });
    }
  }

  function renderCourses() {
    let previewCourses = props.professor.courses.slice(0, 4);
    let course = "Courses: ";
    if (previewCourses.length === 0) {
      course += "N/A";
    } else {
      previewCourses.forEach((item, index) => {
        if (
          index === props.professor.courses.length - 1 ||
          index === previewCourses.length - 1
        ) {
          course += `${item.name}`;
        } else {
          course += `${item.name}, `;
        }
      });
    }

    return course;
  }

  return (
    <CardContainer onClick={props.onClick} className="card">
      <HeaderContainer>
        <ProfessorInformationContainer className="unselectable">
          <p
            style={{
              marginTop: 0,
              fontFamily: "Playfair Display",
              fontSize: 48
            }}
            className="unselectable"
          >
            Prof. {props.professor.name}
            <span
              style={{
                marginLeft: 20,
                fontFamily: "Avenir",
                color: "#919191",
                marginTop: "9%",
                fontSize: 16
              }}
              className="unselectable"
            >
              {props.professor.department}
            </span>
          </p>
          <p
            style={{
              marginTop: -40,
              fontFamily: "Avenir",
              color: "#1e1e1e",
              fontSize: 16
            }}
            className="unselectable"
          >
            {renderCourses()}
          </p>
        </ProfessorInformationContainer>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "-53px"
          }}
        >
          <FaStar size={42} color="maroon" />
          <p className="rating unselectable">
            {props.professor.rating.toFixed(2)}
          </p>
        </div>
      </HeaderContainer>
      <div className="lineContainer">
        <div className="line unselectable" />
      </div>
      <div className="commentsContainer unselectable">{renderComments()}</div>
    </CardContainer>
  );
};

export default Card;
