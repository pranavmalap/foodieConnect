import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import "./Home.css";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";

export const Trending = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();
  const [liked, setLiked] = useState([]);
  const [comment, setCommente] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/recipes/trending"
        );
        setRecipes(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.error(err);
      }
    };
    /////////////////////////////////////////

    fetchRecipe();
    fetchSavedRecipe();
  }, [userID]);

  const saveRecipe = async (recipeID) => {
    const userID = useGetUserID();
    try {
      const response = await axios.put("http://localhost:3001/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.error(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  //////////////////////////

  const videoLiked = async (id) => {
    const userID = useGetUserID();
    try {
      const liked = await axios.put(
        `http://localhost:3001/recipes/like/${id}`,
        { userID }
      );
      // console.log(liked.data);
      setLiked(liked.data);
      const newRecipe = recipes.map((recipe) => {
        if (recipe._id === liked.data._id) {
          return liked.data;
        } else {
          return recipe;
        }
      });
      setRecipes(newRecipe);
      // console.log(newRecipe)
    } catch (err) {
      console.log(err);
    }
  };

  const videoDisliked = async (id) => {
    const userID = useGetUserID();
    try {
      const liked = await axios.put(
        `http://localhost:3001/recipes/dislike/${id}`,
        { userID }
      );
      // console.log(liked.data);
      setLiked(liked.data);
      const newRecipe = recipes.map((recipe) => {
        if (recipe._id === liked.data._id) {
          return liked.data;
        } else {
          return recipe;
        }
      });
      // console.log(newRecipe)
      setRecipes(newRecipe);
    } catch (err) {
      console.log(err);
    }
  };

  const sendComment = async (id, owner) => {
    const userId = useGetUserID();
    const formdata = new FormData();
    formdata.append("comment", comment);
    // console.log(formdata);
    try {
      const commented = await axios.post(
        `http://localhost:3001/recipes/comment/add/${id}`,
        {
          userId,
          owner,
          comment,
        }
      );
      //  console.log(commented.data._id);
      const newCmtRecipe = recipes.map((recipe) => {
        console.log(commented.data);
        if (recipe._id === commented.data._id) {
          return commented.data;
        } else {
          return recipe;
        }
      });
      // console.log(newRecipe)
      setRecipes(newCmtRecipe);
    } catch (error) {
      console.log(error);
    }
  };
  ///////////////////////////////

  ///////////////////////

  const UserProfile = (id) => {
    if (id !== userID) {
      navigate(`/userprofile/${id}`);
    } else {
      navigate("/myvid");
    }
  };
  /////////////////////////////////
  return (
    <div className="container">
      {recipes.map((recipe) => (
        <div key={recipe._id} className="recipe-item">
          <div className="videoPart">
            {recipe.videos.map((video) => (
              <video key={video._id} controls preload="auto">
                <source src={`http://localhost:3001/${video}`} />
                Your browser does not support the video tag.
              </video>
            ))}
            <div className="likeAndComment">
              <div className="likeAndDis">
                {recipe.likes.indexOf(userID) > -1 == true ? (
                  <button onClick={() => videoDisliked(recipe._id, userID)}>
                    <i className="material-icons ">favorite </i>
                  </button>
                ) : (
                  <button onClick={() => videoLiked(recipe._id, userID)}>
                    <i className="material-icons">favorite_border </i>
                  </button>
                )}
                {console.log(recipe)}
                <h3> {recipe.likes.length} Likes</h3>
              </div>
              {/* {console.log(comment)} */}
              <div className="likefollowform">
                <input
                  type="text"
                  name="comment"
                  id="comment"
                  onChange={(e) => {
                    setCommente(e.target.value);
                  }}
                />{" "}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    sendComment(recipe._id, recipe.userOwner._id);
                  }}
                >
                  Comment
                </button>
              </div>
            </div>
          </div>

          <div className="detailPart">
            <div
              className="username"
              onClick={() => UserProfile(recipe.userOwner._id)}
            >
              <div className="smallLogo">
                {recipe.userOwner.username.charAt(0)}
              </div>{" "}
              <h3> {recipe.userOwner.username}</h3>{" "}
            </div>
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
            <button
              onClick={() => saveRecipe(recipe._id)}
              disabled={isRecipeSaved(recipe._id)}
            >
              {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
            </button>

            <div className="showComment">
              <h3>Comments</h3>
              {recipe.commentId.map((comments) => (
                <h4> {comments.comment} </h4>
              ))}
            </div>
          </div>
        </div>
      ))}
      {/* </ul> */}
    </div>
  );
};
