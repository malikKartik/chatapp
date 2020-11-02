import React, { useState } from "react";
import "./createRoom.css";
import TextField from "@material-ui/core/TextField";
import Axios from "axios";
import Button from "@material-ui/core/Button";

const CreateRoom = () => {
  const [groupFormData, setGroupFormData] = useState({
    roomName: "",
    desc: "",
  });
  return (
    <div id="create-chat">
      <br />
      <h1>Add Friend</h1>
      <div
        className="add-friend-request-send"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input type="text" placeholder="Phone Number" />
        <button id="send-request">
          <h1 style={{ margin: "0px" }}>+</h1>
        </button>
      </div>
      <h1>Create Room</h1>
      <input
        placeholder="Room Name"
        value={groupFormData.roomName}
        onChange={(e) => {
          setGroupFormData({ ...groupFormData, roomName: e.target.value });
        }}
      />
      <br />
      <br />
      <input
        placeholder="Room Description"
        onChange={(e) => {
          setGroupFormData({ ...groupFormData, desc: e.target.value });
        }}
      />
      <br />
      <br />
      <input
        placeholder="Room Password"
        onChange={(e) => {
          setGroupFormData({ ...groupFormData, password: e.target.value });
        }}
      />
      <br />
      <br />
      <Button
        onClick={() => {
          Axios.post("http://localhost:3001/api/rooms/create", {
            name: groupFormData.roomName,
            description: groupFormData.desc,
            creator: localStorage.getItem("_id"),
          })
            .then((data) => {
              alert("Created!");
            })
            .catch((e) => {
              console.log(e);
              alert("Error!");
            });
        }}
      >
        Create
      </Button>
    </div>
  );
};

export default CreateRoom;
