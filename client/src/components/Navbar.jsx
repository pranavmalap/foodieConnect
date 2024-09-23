import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
export const Navbar = () => {
  const userID = useGetUserID();
  const [username, setUsername] = useState("");
  const [cookie, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  // useEffect(() => {
    const fetchUsername = async () => {
      try {
        await axios
          .get(`http://localhost:3001/recipes/username/${userID}`)
          .then((res) => {
            setUsername(res.data.username);
            // console.log(res.data.username);
          });
      } catch (err) {
        console.log(err);
      }
    };
 
  //   fetchUsername();
  // }, [userID]);

  const logout = () => {
    // setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/");
  };

  const loogenIn = window.localStorage.getItem("userID")
  return (
    <div className="navbar-links">
      <div>
        
        <Link to="/">
          {" "}
          <h1>Foodie Connect</h1>{" "}
        </Link>
      </div>

      {!loogenIn ? (
  <ul>
    <li>
      <Link to="/aboutus">About Us</Link>
    </li>
    <li>
      <Link to="/login">Login</Link>
    </li>
  </ul>
) : (
  loogenIn === "661284bfea94223ebcf41c17" ? (
    <ul>
      <li>
        <Link to="/reports/recipereport">Recipe</Link>
      </li>
      <li>
        <Link to="/reports/userreport">Users</Link>
      </li>
      <button onClick={logout}>
          <i className="material-icons">logout </i>
        </button>
    </ul>
  ) : (
    <>
      <ul>
        <li>
          <Link to="/"> <i className="material-icons">home </i></Link>
        </li>
        <li>
          <Link to="/trending"><i className="material-icons">poll </i></Link>
        </li>
        <li>
          <Link to="/aboutus"><i className="material-icons">info_outline </i> </Link>
        </li>
        <li>
          <Link to="/upload">
            <i className="material-icons">add </i>
          </Link>{" "}
        </li>
        <li>
          <Link to="/saved-recipes">
            <i className="material-icons">save </i>
          </Link>{" "}
        </li>
        <li>
          <Link to="/myvid">
            <i className="material-icons">account_circle </i> {username}
          </Link>{" "}
        </li>
        <button onClick={logout}>
          <i className="material-icons">logout </i>
        </button>
      </ul>
    </>
  )
)}

    </div>
  );
};
