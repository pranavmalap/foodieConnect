import React, { useState } from "react";
import "./Registration.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Registration = () => {
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [reppassword, setReppassword] = useState();

  return (
    <RegiForm
      name={name}
      setName={setName}
      username={username}
      setUsername={setUsername}
      email={email}
      setEmail={setEmail}
      phone={phone}
      setPhone={setPhone}
      password={password}
      setPassword={setPassword}
      reppassword={reppassword}
      setReppassword={setReppassword}
    ></RegiForm>
  );
};

const RegiForm = ({
  name,
  setName,
  username,
  setUsername,
  email,
  setEmail,
  phone,
  setPhone,
  password,
  setPassword,
  reppassword,
  setReppassword,
}) => {
  const handelSubmit = async (e) => {
    e.preventDefault();

    if (password != reppassword) {
      alert("password doest matches");
      return;
    }

    try {
      const regi = await axios.post("http://localhost:3001/auth/register", {
        name,
        username,
        email,
        phone,
        password,
        reppassword,
      });
      console.log(regi.data.message);

      if (regi.data.message == "exists") {
        alert(
          "User already exists!Please Check Username , Phone Munber and Email "
        );
      } else {
        alert("Registration Done !!!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container1">
      <div className="container2">
        <h1>Registration</h1>
        <p>Please fill this form to create an account. </p>
        <form name="registraion" onSubmit={handelSubmit}>
          <label for="name">
            <b>Name</b>
          </label>
          <input
            type="text"
            placeholder="Enter name"
            name="name"
            id="name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
          <label for="name">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="username"
            id="username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <label for="email">
            <b>Email</b>
          </label>
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            id="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label for="phone">
            <b>Phone Number</b>
          </label>
          <input
            type="number"
            maxLength={10}
            placeholder="Enter phone number"
            name="phone"
            id="phone"
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
          ></input>
          <label for="pass">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            id="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <label for="reppass">
            <b>Repeat Password</b>
          </label>
          <input
            type="password"
            placeholder="Repeat password"
            name="reppassword"
            id="reppassword"
            value={reppassword}
            required
            onChange={(e) => setReppassword(e.target.value)}
          ></input>
          <button type="submit" className="registrationbtn">
            Register
          </button>
        </form>
        <div className="containersignin">
          <p>
            Already have an account?
            <a href="login">Sign in</a>
          </p>
        </div>
      </div>
      <div className="image">
        <img src="./Images/register.png" alt="Cooking Image"></img>
      </div>
    </div>
  );
};
