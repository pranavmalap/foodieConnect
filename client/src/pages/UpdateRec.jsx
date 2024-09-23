import React, { useEffect, useState } from "react";
import "../pages/UpdateRecipe.css";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export const UpdateRec = () => {
  const userID = useGetUserID();
  const nevigate = useNavigate();
  const id = useParams().id;

  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [videos, setVideos] = useState([]);

  const handelUpdate = async (event) => {
    event.preventDefault();

    const recipeData = {
      name,
      ingredients,
      instructions,
      cookingTime,
    };
    try {
      axios.put(`http://localhost:3001/recipes/updaterecipe/${id}`, recipeData);
      alert("Recipe Updated");
      nevigate("/myvid");
    } catch (error) {
      console.log(error);
      // alert("Something went wrong!!");
    }
    awa;
  };

  useEffect(() => {
    const getDetails = async () => {
      try {
        await axios
          .get(`http://localhost:3001/recipes/getrecipe/${id}`)
          .then((res) => {
            setName(res.data.name);
            setIngredients(res.data.ingredients);
            setInstructions(res.data.instructions);
            setCookingTime(res.data.cookingTime);
            setVideos(res.data.videos);
          });
      } catch (err) {
        console.log(err);
      }
    };

    getDetails();
  }, [id]);

  return (
    <div className="body-container-update">
      <h2>Update Recipe</h2>
      <div className="create-recipe-update">
        <div className="videoPart">
          {videos.map((video) => (
            <video
              controls
              width="320"
              height="240"
              src={`http://localhost:3001/${video}`}
            ></video>
          ))}{" "}
        </div>
        <div className="formPart">
          <form onSubmit={handelUpdate}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <label htmlFor="ingredients">Ingredients</label>
            <input
              type="text"
              name="ingredients"
              id="ingredients"
              value={ingredients}
              onChange={(e) => {
                setIngredients(e.target.value);
              }}
            />

            <label htmlFor="instructions">Instructions</label>
            <input
              type="text"
              name="instructions"
              id="instructions"
              value={instructions}
              onChange={(e) => {
                setInstructions(e.target.value);
              }}
            />

            <label htmlFor="cookingTime">Cooking Time</label>
            <input
              type="number"
              name="cookingTime"
              id="cookingTime"
              value={cookingTime}
              onChange={(e) => {
                setCookingTime(e.target.value);
              }}
            />

            <button type="submit">Update Recipe</button>
          </form>
        </div>
      </div>
    </div>
  );
};

// export default CreateRecipe;
