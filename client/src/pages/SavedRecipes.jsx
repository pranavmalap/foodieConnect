import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import { useGetUserID } from "../hooks/useGetUserID";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();
  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
        console.log(response.data.savedRecipes);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSavedRecipe();
  }, []);

  return (
    <div className="container">
      <h1 > Saved Recipes </h1>

      {savedRecipes &&
        savedRecipes.map((recipe) => (
          <div key={recipe._id} className="recipe-item">
            <div className="videoPart">
              {recipe.videos.map((video, index) => (
                <video width="320" height="240" controls>
                  <source
                    src={`http://localhost:3001/${video}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              ))}
            </div>

            <div className="detailPart">
              <div>
                <h2 className="recipe-name">{recipe.name}</h2>
              </div>
              <div>
                <p className="recipe-instructions">{recipe.instructions}</p>
              </div>
              <div>
                <h3>Ingredients</h3>
                <h3>{recipe.ingredients}</h3>
              </div>
              <div>
                <p className="cooking-time">
                  Cooking Time: {recipe.cookingTime} (minutes)
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
