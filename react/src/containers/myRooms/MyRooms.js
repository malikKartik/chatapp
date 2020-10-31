import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyRooms = () => {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/api/users/me", {
      headers: {
        userid: window.localStorage.getItem("_id"),
      },
    })
      .then((data) => {
        setRooms(data.data.rooms);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <>
      <h3>My rooms</h3>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {rooms.map((room) => {
          return (
            <div key={room.name}>
              <Link to={`/chat/${room._id}`}>
                <div
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
                  <p>{room.name}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MyRooms;
