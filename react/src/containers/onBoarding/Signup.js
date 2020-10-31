import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    phone: "",
    firstName: "",
    lastName: "",
  });

  const signup = () => {
    axios
      .post("http://localhost:3001/api/users/signup", { ...formData })
      .then((data) => {
        setFormData({
          username: "",
          password: "",
          phone: "",
          firstName: "",
          lastName: "",
        });
        alert("User Created");
      })
      .catch((e) => {
        alert("Something is not right!");
      });
  };
  return (
    <div style={{ width: "80%" }}>
      <h1 style={{ fontWeight: 300 }}>Welcome back :)</h1>
      <p style={{ fontWeight: 300 }}>
        It is good, that you have decided to become social
      </p>
      <div>
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
        <TextField
          label="Phone"
          placeholder="Phone"
          value={formData.phone}
          fullWidth
          onChange={(e) => {
            setFormData({ ...formData, phone: e.target.value });
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <TextField
            label="First Name"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => {
              setFormData({ ...formData, firstName: e.target.value });
            }}
          />
          <TextField
            label="Last Name"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => {
              setFormData({ ...formData, lastName: e.target.value });
            }}
          />
        </div>
      </div>
      <br />
      <br />
      <button
        onClick={signup}
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
        Signup
      </button>
    </div>
  );
};

export default Signup;
