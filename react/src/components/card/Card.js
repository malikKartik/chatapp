import React from "react";
import "./card.css";

const Card = (props) => {
  return (
    <div
      className="card-comp"
      style={{
        border:
          props.selectedChat && props.room._id === props.selectedChat._id
            ? "1px solid #20b546"
            : "",
        borderLeft:
          props.selectedChat && props.room._id === props.selectedChat._id
            ? "5px solid #20b546"
            : "",
      }}
      onClick={props.onClick}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center ",
        }}
      >
        <div
          className="chat-image-side-card"
          style={{
            height: "70%",
            width: "70%",
            borderRadius: "50%",
            backgroundColor: "#6e46fc",
            display: "flex",
            justifyContent: "center",
            alignItems: "center ",
          }}
        >
          <h1 style={{ color: "white", fontWeight: 300 }}>
            {props.room.name[0]}
          </h1>
        </div>
      </div>
      <div>
        <h3>{props.room.name}</h3>
        <p>{props.room.description}</p>
      </div>
    </div>
  );
};

export default Card;
