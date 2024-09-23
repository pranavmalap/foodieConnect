import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import "./myvid.css";
import { useNavigate, useParams } from "react-router-dom";

const UserVid = () => {
  const id = useParams().id;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [myrecipe, setMyrecipe] = useState([]);

  useEffect(() => {
    const myrecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/myrecipe/${id}`
        );
        setMyrecipe(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchUsername = async () => {
      try {
        await axios
          .get(`http://localhost:3001/recipes/username/${id}`)
          .then((res) => {
            setUsername(res.data.username);
            setEmail(res.data.email);
          });
      } catch (err) {
        console.log(err);
      }
    };

    myrecipes();
    fetchUsername();
  }, [id]);

  return (
    <div className="container">
      <div className="profile">
        <div className="logopart">
          {username && <div className="logo"> {username.charAt(0)} </div>}
        </div>
        <div className="namepart">
          <div className="name">
            {username && <h1 className="name">{username} </h1>}
            {email && <h3 className="name">{email} </h3>}
          </div>
        </div>
      </div>

      {myrecipe.map((recipe) => (
        <div className="recipe-item">
          {/* { console.log(recipe._id)} */}
          {recipe.videos.map((video) => (
            <div className="videoPart">
              <video width="320" height="240" controls>
                <source src={`http://localhost:3001/${video}`} />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}

          <div className="detailPart">
            <div>
              {" "}
              <h2 className="recipe-name">{recipe.name}</h2>{" "}
            </div>
            <div>
              {" "}
              <p className="recipe-instructions">{recipe.instructions}</p>{" "}
            </div>
            <div>
              <h3>Ingredients</h3>
              <h3>{recipe.ingredients}</h3>
            </div>
            <div>
              {" "}
              <p className="cooking-time">
                {" "}
                Cooking Time: {recipe.cookingTime} (minutes)
              </p>{" "}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserVid;
