import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import "./myvid.css";
import { useNavigate } from "react-router-dom";

const MyVideos = () => {
  const navigate = useNavigate();
  const userID = useGetUserID();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [myrecipe, setMyrecipe] = useState([]);

  const updateprofile = (id) => {
    navigate(`/updateProfile/${id}`);
  };

  const updateRecipe = (id) => {
    navigate(`/updateRecipe/${id}`);
  };
  const deleteRecipe = async (id) => {
    try {
      const confirmed = confirm("Are you sure you want to delete this recipe?");
      if (!confirmed) return;

      await axios.delete(`http://localhost:3001/recipes/deleterecipe/${id}`);
      alert("Delete Successful");
      navigate("/myvid");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const myrecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/myrecipe/${userID}`
        );
        setMyrecipe(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchUsername = async () => {
      try {
        await axios
          .get(`http://localhost:3001/recipes/username/${userID}`)
          .then((res) => {
            setUsername(res.data.username);
            setName(res.data.name);
            setEmail(res.data.email);
          });
      } catch (err) {
        console.log(err);
      }
    };

    myrecipes();
    fetchUsername();
  }, [userID]);

  return (
    <div className="container">
      <div className="profile">
        <div className="logopart">
          {username && <div className="logo"> {username.charAt(0)} </div>}
        </div>
        <div className="namepart">
          <div className="name">
            {username && <h1 className="name">{username} </h1>}
            {name && <h3 className="name">{name} </h3>}
            {email && <h3 className="name">{email} </h3>}
            <button onClick={() => updateprofile(userID)}>
              <i className="material-icons">edit </i>{" "}
            </button>
          </div>
        </div>
      </div>

      {myrecipe.map((recipe) => (
        <div className="recipe-item">
          <div className="videoPart">
            {recipe.videos.map((video) => (
              <video width="320" height="240" controls>
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

                <h3> {recipe.likes.length} Likes</h3>
              </div>
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
          {/* ////////////////////////////// */}
          <div className="detailPart">
            <div className="editPart">
              <button onClick={() => updateRecipe(recipe._id)}>
                {" "}
                <i className="material-icons">edit </i>{" "}
              </button>
              <button onClick={() => deleteRecipe(recipe._id)}>
                {" "}
                <i className="material-icons">delete </i>{" "}
              </button>

              <div
                className="username"
                onClick={() => UserProfile(recipe.userOwner._id)}
              >
                <div className="smallLogo">
                  {recipe.userOwner.username.charAt(0)}
                </div>{" "}
                <h3> {recipe.userOwner.username}</h3>{" "}
              </div>
            </div>

            <div>
              <h2 className="recipe-name">{recipe.name}</h2>
            </div>

            <div>
              <h3>Instruction</h3>
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

            {/* <div className="showComment">
              <h3>Comments</h3>
              <div className="commentList">
                {recipe.commentId.map((comments) => (
                  <h4> - {comments.comment} </h4>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyVideos;
