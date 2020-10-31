import React, { useState } from "react";
import "./onBoarding.css";
import Switch from "./Switch";
import Login from "./Login";
import Signup from "./Signup";
import blob from "../../assets/blob.svg";
import blob1 from "../../assets/blob1.svg";
import onboard from "../../assets/onboard.png";

const OnBoarding = (props) => {
  const [loginForm, setLoginForm] = useState(true);

  return (
    <div className="container-full-onboarding">
      <div className="inner-container">
        <div style={{ position: "relative" }}>
          <img
            src={onboard}
            alt="onboard"
            width="100%"
            style={{ position: "absolute", top: "10%", left: "0%" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1 style={{ fontWeight: 400 }}>BIMP CHAT</h1>
          <Switch loginForm={loginForm} setLoginForm={setLoginForm}></Switch>
          {loginForm ? (
            <Login setIsLoggedIn={props.setIsLoggedIn}></Login>
          ) : (
            <Signup></Signup>
          )}
        </div>
      </div>
      <img
        src={blob}
        height="130%"
        width="200%"
        alt="blob"
        className="onboarding-img"
      />
      <img
        src={blob1}
        height="150%"
        width="200%"
        alt="blob1"
        className="onboarding-img1"
      />
    </div>
  );
};

export default OnBoarding;
