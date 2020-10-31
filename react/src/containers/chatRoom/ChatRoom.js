import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
const socket = io("http://localhost:3001");

const ChatRoom = (props) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/messages/recent", {
        headers: {
          roomid: window.location.pathname.split("/")[2],
        },
      })
      .then((data) => {
        setMessages(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    socket.emit("joinRoom", window.location.pathname.split("/")[2]);

    socket.on("connectedToServer", () => {
      console.log("Connected!!");
    });

    socket.on("typing", (user) => {
      setTyping(user.userName);
    });

    socket.on("messageFromRoom", (message) => {
      let temp = [...messages];
      temp.push(message);
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
    socket.emit("messageRoom", window.location.pathname.split("/")[2], {
      message,
      from: { firstName: window.localStorage.getItem("firstName") },
      userId: window.localStorage.getItem("_id"),
    });
    setMessage("");
  };

  return (
    <>
      <h2>Chat</h2>
      <div>
        {messages.map((thisMessage) => {
          return (
            <>
              <p>
                {thisMessage.from.firstName}:{thisMessage.message}
              </p>
            </>
          );
        })}
        <p>
          {typing && typing !== window.localStorage.getItem("firstName")
            ? typing + " is typing..."
            : null}
        </p>
        <input
          type="text"
          value={message}
          onChange={(e) => {
            socket.emit("typing", window.location.pathname.split("/")[2], {
              userName: window.localStorage.getItem("firstName"),
            });
            setMessage(e.target.value);
          }}
        />
        <button onClick={sendMessage}>Click</button>
      </div>
    </>
  );
};

export default ChatRoom;
