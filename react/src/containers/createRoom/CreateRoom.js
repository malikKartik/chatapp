import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Axios from "axios";
import Button from "@material-ui/core/Button";

const CreateRoom = () => {
  const [formData, setFormData] = useState({ roomName: "", desc: "" });
  return (
    <>
      <br />
      <TextField
        id="room-name"
        label="Rooms Name"
        placeholder="Room Name"
        variant="outlined"
        value={formData.roomName}
        onChange={(e) => {
          setFormData({ ...formData, roomName: e.target.value });
        }}
      ></TextField>
      <br />
      <br />
      <TextField
        id="room-desc"
        label="Rooms description"
        placeholder="Room desc"
        variant="outlined"
        onChange={(e) => {
          setFormData({ ...formData, desc: e.target.value });
        }}
      />
      <br />
      <br />
      <Button
        onClick={() => {
          Axios.post("http://localhost:3001/api/rooms/create", {
            name: formData.roomName,
            description: formData.desc,
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
    </>
  );
};

export default CreateRoom;
