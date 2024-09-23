import { useState } from "react";
import React from "react";
import axios from "axios";
import "../pages/CreateRecipe.css";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const userID = useGetUserID();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [videos, setVideos] = useState([]);
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [cookingTime, setCookingTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let formdata = new FormData();
    for (let key in videos) {
      formdata.append("videos", videos[key]);
    }

    formdata.append("name", name);

    formdata.append("ingredients", ingredients);
    formdata.append("instructions", instructions);
    formdata.append("cookingTime", cookingTime);
    formdata.append("userOwner", userID),
      axios
        .post("http://localhost:3001/recipes/create", formdata)
        .then((success) => {
          // getAllMedias();
          alert("recipe created");
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          alert("Error Happened");
        });
  };

  return (
    <div className="body-container">
      <div className="create-recipe">
        <h2>Create Recipe</h2>
        <form action="" onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <label htmlFor="ingredients">Ingredients</label>
            <input
              type="text"
              name="ingredients"
              id="ingredients"
              onChange={(e) => {
                setIngredients(e.target.value);
              }}
            />

            <label htmlFor="instructions">Instructions</label>
            <input
              type="text"
              name="instructions"
              id="instructions"
              onChange={(e) => {
                setInstructions(e.target.value);
              }}
            />

            <label htmlFor="cookingTime">Cooking Time</label>
            <input
              type="number"
              name="cookingTime"
              id="cookingTime"
              onChange={(e) => {
                setCookingTime(e.target.value);
              }}
            />
        
            <label htmlFor="videos">Upload Video</label>

            <input
              type="file"
              name="videos"
              id="videos"
              multiple
              className="form-control"
              accept=".mp4, .mkv"
              onChange={(e) => {
                setVideos(e.target.files);
              }}
            />


          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Upload;
