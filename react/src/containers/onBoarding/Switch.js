import React from "react";
const colorPrime = "#6e46fc";
const colorSec = "rgb(220, 220, 220)";
const textColorPrime = "white";
const textColorSec = "black";
const Switch = (props) => {
  return (
    <div
      style={{
        width: "300px",
        height: "45px",
        backgroundColor: colorSec,
        borderRadius: "25px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <button
        onClick={() => {
          props.setLoginForm(true);
        }}
        style={{
          ...styles.button,
          backgroundColor: props.loginForm ? colorPrime : colorSec,
          color: props.loginForm ? textColorPrime : textColorSec,
        }}
      >
        Login
      </button>
      <button
        onClick={() => {
          props.setLoginForm(false);
        }}
        style={{
          ...styles.button,
          backgroundColor: props.loginForm ? colorSec : colorPrime,
          color: props.loginForm ? textColorSec : textColorPrime,
        }}
      >
        Create Account
      </button>
    </div>
  );
};

const styles = {
  button: {
    height: "40px",
    borderRadius: "20px",
    width: "calc(50% - 5px)",
    border: "none",
    color: "white",
  },
};

export default Switch;
