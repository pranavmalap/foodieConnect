import React, { useState } from "react";
import "../pages/Login.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });

      setError("");

      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      navigate("/");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status == 401) {
        alert("Incorrect username or password!, Please try again !");
      } else {
        alert("Unexcepted Error occured");
      }
    }
  };

  return (
    <div className="container1">
      <div className="logincontainer">
        <h1>Login</h1>
        <form onSubmit={handelSubmit}>
          <label htmlFor="Username">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter username"
            name="username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="Password">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="loginbtn">
            Sigin
          </button>
        </form>
        <br />
        <Link to="/forgot-password">Forgot-password</Link>
        <div className="sigincontainer">
          <p>
            Not have an Account ? <a href="register">Signup</a>
          </p>
        </div>
      </div>
      <div className="imagecontainere">
        <img src=".\Images\register.png"></img>
      </div>
    </div>
  );
};
