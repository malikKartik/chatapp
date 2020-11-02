import React from "react";
import "./typing.css";

const Typing = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        position: "relative",
        width: "60px",
        height: "16px",
        left: "10px",
      }}
    >
      <div id="typing-dot-one" className="typing-dot"></div>
      <div id="typing-dot-two" className="typing-dot"></div>
      <div id="typing-dot-three" className="typing-dot"></div>
    </div>
  );
};

export default Typing;
