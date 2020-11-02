import React, { useState, useEffect, useRef } from "react";
import "./chat.css";
import io from "socket.io-client";
import axios from "axios";
import sendIcon from "../../../assets/send.svg";
import Typing from "../../../components/typing/Typing";

const socket = io("http://localhost:3001");

const Chat = (props) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(null);
  const [gettingMessages, setGettingMessages] = useState(false);
  const chatBox = useRef(null);
  useEffect(() => {
    if (gettingMessages) return;
    setGettingMessages(true);
    axios
      .get("http://localhost:3001/api/messages/recent", {
        headers: {
          roomid: props.selectedChat._id,
        },
      })
      .then((data) => {
        setGettingMessages(false);
        setMessages(data.data);
        chatBox.current.scrollTop = chatBox.current.scrollHeight;
      })
      .catch((e) => {
        setGettingMessages(false);
        console.log(e);
      });
  }, [props.selectedChat]);

  useEffect(() => {
    socket.emit("joinRoom", props.selectedChat._id);

    socket.on("messageFromRoom", (message) => {
      let temp = [...messages];
      temp.unshift(message);
      setMessages(temp);
      chatBox.current.scrollTop = chatBox.current.scrollHeight;
    });

    return () => {
      socket.off("messageFromRoom");
    };
  }, [messages]);

  useEffect(() => {
    socket.on("typing", (user) => {
      setTyping(user.userName);
      chatBox.current.scrollTop = chatBox.current.scrollHeight;
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setTyping(null);
    }, 2000);
  }, [typing]);

  const sendMessage = () => {
    if (message.length <= 0) return;
    socket.emit("messageRoom", props.selectedChat._id, {
      message,
      time: new Date(),
      from: {
        firstName: window.localStorage.getItem("firstName"),
        _id: localStorage.getItem("_id"),
      },
      userId: window.localStorage.getItem("_id"),
    });
    setMessage("");
  };

  const isDateEqual = (curr, prev) => {
    let date1 = new Date(curr);
    date1.setHours(0, 0, 0, 0);
    let date2 = new Date(prev);
    date2.setHours(0, 0, 0, 0);
    return date1.getTime() === date2.getTime();
  };

  const isShowTime = (curr, next) => {
    if (!next) return true;
    if (!curr) return false;
    if (curr.from._id === next.from._id) return false;
    return true;
  };

  const formatDate = (date) => {
    let date1 = new Date(date);
    return `${date1.getDate()} ${date1.toLocaleString("default", {
      month: "short",
    })} ${date1.getFullYear()}`;
  };

  const loadMore = () => {
    if (chatBox.current.scrollTop === 0) {
      if (gettingMessages) return;
      const oldHeight = chatBox.current.scrollHeight;

      setGettingMessages(true);
      axios
        .get("http://localhost:3001/api/messages/get", {
          headers: {
            skip: messages.length,
            roomid: props.selectedChat._id,
          },
        })
        .then((data) => {
          let temp = messages;
          messages.push(...data.data);
          setMessages(temp);
          setGettingMessages(false);
          chatBox.current.scrollTop = chatBox.current.scrollHeight - oldHeight;
        })
        .catch((e) => {
          setGettingMessages(false);
          console.log(e);
        });
    }
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
      {/* HEADER */}
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
            backgroundColor: "rgb(110, 70, 252)",
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

      {/* CHAT */}
      <div
        ref={chatBox}
        className="chat-chat"
        style={{ height: "calc(100% - 110px)" }}
        onScroll={() => loadMore()}
      >
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
                        position: "relative",
                      }}
                    >
                      <p style={{ textAlign: "right", margin: 0 }}>
                        {message.message}
                      </p>
                      <div className="chat-message-time">
                        {isShowTime(array[index], array[index + 1])
                          ? new Date(message.time).getHours() +
                            ":" +
                            new Date(message.time).getMinutes()
                          : null}
                      </div>
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
                        position: "relative",
                      }}
                    >
                      <p style={{ textAlign: "left", margin: 0 }}>
                        {message.message}
                      </p>
                      <div
                        className="chat-message-time"
                        style={{ left: "0px" }}
                      >
                        {isShowTime(array[index], array[index + 1])
                          ? new Date(message.time).getHours() +
                            ":" +
                            new Date(message.time).getMinutes()
                          : null}
                      </div>
                    </div>
                    <div></div>
                  </div>
                )}
              </>
            );
          })}
        {typing && typing !== localStorage.getItem("_id") ? (
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
              <Typing></Typing>
            </div>
            <div></div>
          </div>
        ) : null}
      </div>
      <br />
      {/* MESSAGE INPUT */}
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
              socket.emit("typing", props.selectedChat._id, {
                userName: window.localStorage.getItem("_id"),
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
