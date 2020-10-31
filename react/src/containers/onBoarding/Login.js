import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Axios from "axios";

const Login = (props) => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const login = () => {
    Axios.get("http://localhost:3001/api/users/login", {
      headers: {
        username: formData.username,
        password: formData.password,
      },
    })
      .then((data) => {
        localStorage.setItem("firstName", data.data.firstName);
        localStorage.setItem("lastName", data.data.lastName);
        localStorage.setItem("phone", data.data.phone);
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("username", data.data.username);
        localStorage.setItem("_id", data.data._id);
        props.setIsLoggedIn(true);
      })
      .catch((e) => {
        console.log(e);
        alert("Invalid credentials!");
      });
  };
  return (
    <>
      <div>
        <h1 style={{ fontWeight: 300 }}>Welcome back :)</h1>
        <p style={{ fontWeight: 300 }}>
          It is good, that you have decided to become social
        </p>
        <TextField
          label="Username"
          placeholder="Username"
          value={formData.username}
          fullWidth
          onChange={(e) => {
            setFormData({ ...formData, username: e.target.value });
          }}
        />
        <br />
        <TextField
          label="Password"
          placeholder="Password"
          value={formData.password}
          fullWidth
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
        />
        <br />
        <br />
        <button
          onClick={login}
          style={{
            height: "35px",
            width: "120px",
            border: "none",
            boxShadow: "0 0 7px rgba(0,0,0,0.3)",
            color: "white",
            borderRadius: "4px",
            backgroundColor: "#6e46fc",
          }}
        >
          Login
        </button>
      </div>
    </>
  );
};

export default Login;
