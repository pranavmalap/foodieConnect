import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");

  const id = useParams().id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name,
      username,
      phone,
      email,
      about,
    };

    try {
      const regi = await axios.put(
        `http://localhost:3001/recipes/user/${id}`,
        userData
      );

      if (regi.data.message == "exists") {
        alert(
          "User already exists!Please Check Username , Phone Munber and Email "
        );
      } else {
        alert("Account Updated");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      // alert("Something went wrong!!");
    }
  };
  useEffect(() => {
    const getDetails = async () => {
      try {
        await axios
          .get(`http://localhost:3001/recipes/username/${id}`)
          .then((res) => {
            setUsername(res.data.username);
            setName(res.data.name);
            setPhone(res.data.phone);
            setEmail(res.data.email);
            setAbout(res.data.about);
          });
      } catch (err) {
        console.log(err);
      }
    };

    getDetails();
  }, [id]);

  return (
    <div className="container1">
      <div className="container2">
        <h1>Update Profile</h1>

        <form name="registraion" onSubmit={handleSubmit}>
          <label for="name">
            <b>Name</b>
          </label>
          {name !== "" && (
            <input
              type="text"
              placeholder="Enter name"
              name="name"
              id="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            ></input>
          )}
          <label for="name">
            <b>Username</b>
          </label>
          {username !== "" && (
            <input
              type="text"
              placeholder="Enter Username"
              name="username"
              id="username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          )}
          <label for="email">
            <b>Email</b>
          </label>
          {email !== "" && (
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              id="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          )}
          <label for="phone">
            <b>Phone Number</b>
          </label>
          {phone !== "" && (
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
          )}
          <label for="about">
            <b>About</b>
          </label>
          {about !== "" && (
            <input
              type="text"
              placeholder="About your account"
              name="about"
              id="about"
              value={about}
              // required
              onChange={(e) => setAbout(e.target.value)}
            ></input>
          )}

          <button type="submit" className="registrationbtn">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
