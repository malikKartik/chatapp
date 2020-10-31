import React, { useState, useEffect, useRef } from "react";
import "./chat.css";
import io from "socket.io-client";
import axios from "axios";
import sendIcon from "../../../assets/send.svg";
const socket = io("http://localhost:3001");

const Chat = (props) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/messages/recent", {
        headers: {
          roomid: props.selectedChat._id,
        },
      })
      .then((data) => {
        setMessages(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [props.selectedChat]);

  useEffect(() => {
    socket.emit("joinRoom", props.selectedChat._id);

    socket.on("typing", (user) => {
      setTyping(user.userName);
    });

    socket.on("messageFromRoom", (message) => {
      let temp = [...messages];
      temp.unshift(message);
      setMessages(temp);
    });

    return () => {
      socket.off("messageFromRoom");
    };
  }, [messages]);

  useEffect(() => {
    setTimeout(() => {
      setTyping(null);
    }, 2000);
  }, [typing]);

  const sendMessage = () => {
    if (message.length <= 0) return;
    socket.emit("messageRoom", props.selectedChat._id, {
      message,
      from: {
        firstName: window.localStorage.getItem("firstName"),
        _id: localStorage.getItem("_id"),
      },
      userId: window.localStorage.getItem("_id"),
    });
    setMessage("");
  };

  const isDateEqual = (curr, next) => {
    let date1 = new Date(curr);
    date1.setHours(0, 0, 0, 0);
    let date2 = new Date(next);
    date2.setHours(0, 0, 0, 0);
    return date1.getTime() === date2.getTime();
  };

  const formatDate = (date) => {
    let date1 = new Date(date);
    return `${date1.getDate()} ${date1.toLocaleString("default", {
      month: "short",
    })} ${date1.getFullYear()}`;
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        padding: "30px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        className="chat-chat-header"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <div
          className="chat-header-image"
          style={{
            height: "50px",
            width: "50px",
            borderRadius: "50%",
            backgroundColor: "blue",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 style={{ fontWeight: 300, color: "white" }}>
            {props.selectedChat.name[0]}
          </h1>
        </div>
        <div className="chat-header-text">
          <h3>{props.selectedChat.name}</h3>
          <p>Kartik, Malik, Mike</p>
        </div>
      </div>

      <div className="chat-chat" style={{ height: "calc(100% - 110px)" }}>
        {messages
          .slice()
          .reverse()
          .map((message, index, array) => {
            return (
              <>
                {array[index] &&
                index > 0 &&
                isDateEqual(array[index].time, array[index - 1].time)
                  ? index === 0
                    ? formatDate(array[index].time)
                    : null
                  : formatDate(array[index].time)}
                {message.from._id === localStorage.getItem("_id") ? (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <div></div>
                    <div
                      style={{
                        alignSelf: "flex-end",
                        backgroundColor: "#6e46fc",
                        maxWidth: "80%",
                        color: "white",
                        borderRadius: "8px",
                        width: "fit-content",
                        padding: "10px",
                        marginRight: "10px",
                        borderBottomRightRadius: "0px",
                      }}
                    >
                      <p style={{ textAlign: "right", margin: 0 }}>
                        {message.message}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        borderRadius: "5px",
                        backgroundColor: "white",
                        border: "1px solid #eee",
                        maxWidth: "80%",
                        borderRadius: "8px",
                        width: "fit-content",
                        padding: "10px",
                        borderBottomLeftRadius: "0px",
                      }}
                    >
                      <p style={{ textAlign: "left", margin: 0 }}>
                        {message.message}
                      </p>
                    </div>
                    <div></div>
                  </div>
                )}
              </>
            );
          })}
      </div>

      <div
        className="chat-chat-input"
        style={{ width: "100%", height: "60px" }}
      >
        <div className="input">
          <input
            type="text"
            placeholder="Write your message..."
            value={message}
            onChange={(e) => {
              socket.emit("typing", window.location.pathname.split("/")[2], {
                userName: window.localStorage.getItem("firstName"),
              });
              setMessage(e.target.value);
            }}
          />
          <button onClick={sendMessage}>
            <img src={sendIcon} alt="send icon" height="16px" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
