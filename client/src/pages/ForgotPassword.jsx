import React, { useState } from "react";
import "../pages/ForgotPassword.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/auth/forgot-password", { email })
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="forgot-password">
      <form onSubmit={handelSubmit}>
        <h2>Forgot password</h2>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="enter email"
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
        <button type="submit">send</button>
      </form>
    </div>
  );
};
