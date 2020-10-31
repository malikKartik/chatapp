import React, { useState, useEffect } from "react";
import "./home.css";
import Card from "../../components/card/Card";
import searchIcon from "../../assets/search.svg";
import Chat from "./chat/Chat";

import axios from "axios";
const Home = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  useEffect(() => {
    console.log(selectedChat);
  }, [selectedChat]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users/me", {
        headers: {
          userid: window.localStorage.getItem("_id"),
        },
      })
      .then((data) => {
        setChats(data.data.rooms);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div className="home-page">
      <div>
        <div className="search-home-page">
          <div className="search">
            <img src={searchIcon} alt="Search Icon" height="16px" />
            <input type="text" />
          </div>
        </div>
        <div className="chat-cards-home-page">
          {chats.map((chat) => {
            return (
              <Card room={chat} onClick={() => setSelectedChat(chat)}></Card>
            );
          })}
        </div>
      </div>
      <div style={{ height: "100%", width: "100%" }}>
        {selectedChat ? <Chat selectedChat={selectedChat}></Chat> : null}
      </div>
    </div>
  );
};

export default Home;
