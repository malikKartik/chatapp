import Axios from "axios";
import React, { useEffect, useState } from "react";

const JoinRoom = () => {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/api/rooms/getAll")
      .then((data) => {
        setRooms(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const joinFunc = (room) => {
    Axios.post("http://localhost:3001/api/rooms/join", {
      userId: window.localStorage.getItem("_id"),
      roomId: room._id,
    })
      .then((data) => {
        alert("Joined");
      })
      .catch((e) => {
        alert("Error!!");
      });
  };
  return (
    <>
      <h3>List of rooms</h3>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {rooms.map((item) => {
          return (
            <div
              key={item.name}
              onClick={() => joinFunc(item)}
              style={{
                boxShadow: "0 0 5px rgba(0,0,0,0.3)",
                height: "100px",
                width: "200px",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "10px",
              }}
            >
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default JoinRoom;
