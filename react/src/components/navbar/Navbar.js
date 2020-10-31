import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <nav id="main-nav">
      <div className="main-nav-elements">
        {props.elements.map((element) => {
          return (
            <Link to={element.path}>
              <div
                onClick={element.onClick}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  boxSizing: "border-box",
                  borderTopLeftRadius:
                    props.activeNav === element.title ? "3px" : "0px",
                  borderBottomLeftRadius:
                    props.activeNav === element.title ? "3px" : "0px",
                  borderLeft:
                    props.activeNav === element.title
                      ? "3px solid #a7f0ba"
                      : "",
                  backgroundColor:
                    props.activeNav === element.title ? "#7f7fff" : "inherit",
                }}
              >
                <img
                  src={
                    props.activeNav === element.title
                      ? element.activeIcon
                      : element.icon
                  }
                  alt={element.title}
                  height="20px"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
