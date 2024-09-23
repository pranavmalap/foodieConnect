// import React, { useState } from "react";
// import "../pages/CreateRecipe.css";
// import { Navbar } from "../components/Navbar";
// import axios from "axios";
// import { useGetUserID } from "../hooks/useGetUserID";
// import { useNavigate } from "react-router-dom";

// export const CreateRecipe = () => {
//   const userID = useGetUserID();
//   const navigate = useNavigate();

//   const [name , setName] = useState('');
//   const [ingredients , setIngredients] = useState('');
//   const [instructions , setInstructions] = useState('');
//   const [cookingTime , setCookingTime] = useState('');
//   const [videos, setVideos] = useState('');

//   const handelSubmit = async (event) => {
//     event.preventDefault();

//       const formdata = new FormData();

//       formdata.append("videos", videos);
//       formdata.append("name", name);
//       formdata.append("ingredients", ingredients);
//       formdata.append("instructions", instructions);
//       formdata.append("cookingTime", cookingTime);
//       formdata.append("userOwner",  userID),

//       await axios.post("http://localhost:3001/recipes/create", formdata )

//       .then(success =>{
//           // getAllMedias();
//           alert("recipe created");
//           navigate("/");
//       })
//      .catch(error=> {
//       console.error(error);
//     })
// };

//   return (
//     <div className="body-container">
//       <div className="create-recipe">
//         {/* <Navbar /> */}
//         <h2>Create Recipe</h2>
//         <form onSubmit={handelSubmit} action="/recipes/create" method="post" enctype="multipart/form-data">
//           <label htmlFor="name">Name</label>
//           <input
//             type="text"
//             name="name"
//             id="name"
//             onChange={(e) => {
//                 setName(e.target.value);
//             }}
//           />

//           <label htmlFor="ingredients">Ingredients</label>
//           <input
//             type="text"
//             name="ingredients"
//             id="ingredients"
//             onChange={(e) => {
//                 setIngredients(e.target.value);
//             }}
//           />

//           <label htmlFor="instructions">Instructions</label>
//           <input
//             type="text"
//             name="instructions"
//             id="instructions"
//             onChange={(e) => {
//                 setInstructions(e.target.value);
//             }}
//           />

//           <label htmlFor="cookingTime">Cooking Time</label>
//           <input
//             type="number"
//             name="cookingTime"
//             id="cookingTime"
//             onChange={(e) => {
//                 setCookingTime(e.target.value);
//             }}
//           />

//           <label htmlFor="videos"> Videos</label>
//           <input
//             type="file"
//             name="videos"
//             id="videos"
//             className="form-control"
//             accept=".mp4, .mkv"
//             onChange={(e) => {
//               setVideos(e.target.files);
//             }}
//           />

//           <button type="submit">Upload Recipe</button>
//         </form>
//       </div>
//     </div>
//   );
// };

import React, { useState } from "react";
import "../pages/CreateRecipe.css";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";

export const CreateRecipe = () => {
  const userID = useGetUserID();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [videos, setVideos] = useState([]);

  const handelSubmit = async (event) => {
    event.preventDefault();

    const formdata = new FormData();

    for (let key in videos) {
      formdata.append("videos", videos[key]);
    }
    formdata.append("name", name);
    formdata.append("ingredients", ingredients);
    formdata.append("instructions", instructions);
    formdata.append("cookingTime", cookingTime);
    formdata.append("userOwner", userID),
      await axios
        .post("http://localhost:3001/recipes/create", formdata)

        .then((success) => {
          // getAllMedias();
          alert("recipe created");
          navigate("/");
        })
        .catch((error) => {
          console.error(error);
        });
    console.log(videos);
  };

  return (
    <div className="body-container">
      <div className="create-recipe">
        {/* <Navbar /> */}
        <h2>Create Recipe</h2>
        <form
          onSubmit={handelSubmit}
          method="post"
          enctype="multipart/form-data"
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
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

          <label htmlFor="videos"> Videos</label>
          <input
            type="file"
            name="videos"
            id="videos"
            // multiple
            className="form-control"
            accept=".mp4, .mkv"
            onChange={(e) => {
              setVideos(e.target.files);
            }}
          />

          <button type="submit">Upload Recipe</button>
        </form>
      </div>
    </div>
  );
};

// export default CreateRecipe;
