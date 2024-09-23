import React, { useState } from "react";
import "../pages/ResetPassword.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigate = useNavigate();
  const { id, token } = useParams();

  const handelSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== repeatPassword) {
      alert("Passwords do not match");
      return;
    }
    axios
      .post(`http://localhost:3001/auth/reset-password/${id}/${token}`, {
        newPassword,
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="reset-password">
      <form onSubmit={handelSubmit}>
        <h2>Reset Password</h2>
        <br />
        <label htmlFor="newPassword">New Password</label>
        <input
          type="password"
          placeholder="new password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <label htmlFor="repeatPassword">Repeat Password</label>
        <input
          type="password"
          placeholder="repeat password"
          id="repeatPassword"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        <br />
        <button type="submit"> Reset Password</button>
      </form>
    </div>
  );
};
