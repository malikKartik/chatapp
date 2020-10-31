import React, { useState } from "react";
import "./mainContainer.css";
import Navbar from "../components/navbar/Navbar";
import blob from "../assets/blob.svg";
import blob1 from "../assets/blob1.svg";
import home from "../assets/home.svg";
import homeActive from "../assets/homeactive.svg";
import room from "../assets/room.svg";
import roomActive from "../assets/roomactive.svg";
import join from "../assets/join.svg";
import joinActive from "../assets/joinactive.svg";
import logout from "../assets/logout.svg";
import logoutActive from "../assets/logoutactive.svg";

const MainContainer = (props) => {
  const [activeNav, setActiveNav] = useState("Home");

  const navElements = [
    {
      title: "Home",
      path: "/",
      icon: home,
      activeIcon: homeActive,
      onClick: () => {
        setActiveNav("Home");
      },
    },
    {
      title: "Create Room",
      path: "/createRoom",
      icon: room,
      activeIcon: roomActive,
      onClick: () => {
        setActiveNav("Create Room");
      },
    },
    {
      title: "Join A Room",
      path: "/joinRoom",
      icon: join,
      activeIcon: joinActive,
      onClick: () => {
        setActiveNav("Join A Room");
      },
    },
    {
      title: "Logout",
      path: "/",
      icon: logout,
      activeIcon: logoutActive,
      onClick: () => {
        setActiveNav("Logout");
        window.localStorage.clear();
        props.setIsLoggedIn(false);
      },
    },
  ];
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "relative",
        zIndex: 20,
      }}
    >
      <div id="application">
        <Navbar elements={navElements} activeNav={activeNav}></Navbar>
        {props.children}
      </div>
      <img
        src={blob}
        height="130%"
        width="200%"
        alt="blob"
        className="main-comp-img"
      />
      <img
        src={blob1}
        height="150%"
        width="200%"
        alt="blob1"
        className="main-comp-img1"
      />
    </div>
  );
};

export default MainContainer;
