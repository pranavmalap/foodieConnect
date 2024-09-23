// import express from "express";

// import { UserModel } from "../models/Users.js";
// import { RecipeModel } from "../models/Recipes.js";
// import { mediaController } from "../controllers/mediaController.js";

// import multer from "multer";
// import path from "path";
// import fs from "fs";
// import { Console } from "console";

// const router = express.Router();

// router.get("/", async (req, res) => {
//   try {
//     const response = await RecipeModel.find().sort({ createdAt: -1 }).populate("userOwner");
//     res.json(response);
//   } catch (err) {
//     res.json(err);
//   }
// });

// // router.post("/", async (req, res) => {
// //   const recipe = new RecipeModel(req.body);
// //   try {
// //     const response = await recipe.save();
// //     res.json(response);
// //   } catch (err) {
// //     res.json(err);
// //   }
// // });

// router.put("/", async (req, res) => {
//   try {
//     const recipe = await RecipeModel.findById(req.body.recipeID);
//     const user = await UserModel.findById(req.body.userID);
//     user.savedRecipes.push(recipe);
//     await user.save();
//     res.json({ savedRecipes: user.savedRecipes });
//   } catch (err) {
//     res.json(err);
//   }
// });

// router.get("/savedRecipes/ids/:userID", async (req, res) => {
//   try {
//     const user = await UserModel.findById(req.params.userID);
//     res.json({ savedRecipes: user?.savedRecipes });
//   } catch (err) {
//     res.json(err);
//   }
// });

// router.get("/savedRecipes/:userID", async (req, res) => {
//   try {
//     const user = await UserModel.findById(req.params.userID);
//     const savedRecipes = await RecipeModel.find({
//       _id: { $in: user.savedRecipes },
//     });
//     res.json({ savedRecipes });
//   } catch (err) {
//     res.json(err);
//   }
// });
// /////////////////////////

// router.get("/all", async (req, res) => {
//   try {
//     const recipe = await RecipeModel.find();
//     res.json(recipe);
//   } catch (error) {
//     console.log(error);
//     res.status(400).json(error);
//   }
// });
// // router.get("/all", mediaController.getAll);

// router.get("/myrecipe/:id", async (req, res) => {
//   const userId = req.params.id;
//   try {
//     const mymedia = await RecipeModel.find({ userOwner: userId }).sort({
//       createdAt: -1,
//     });
//     res.json(mymedia);
//   } catch (error) {
//     console.log(error);
//     res.status(400).json(error);
//   }
// });
// // router.get("/user", mediaController.getUser);

// ///////////////////////////////////////////
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // C:\CollegeProject\api\public
//     if (!fs.existsSync("public")) {
//       fs.mkdirSync("public");
//     }
//     if (!fs.existsSync("public/videos")) {
//       fs.mkdirSync("public/videos");
//     }
//     cb(null, "./public/videos");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + file.originalname);
//   },
// });

// const upload = multer({
//   storage: storage,
//   fileFilter: function (req, file, cb) {
//     var ext = path.extname(file.originalname);

//     if (ext !== ".mkv" && ext !== ".mp4") {
//       return cb(new Error("Only videos are allowed!"));
//     }
//     cb(null, true);
//   },
// });

// router.post(
//   "/create",
//   upload.fields([
//     {
//       name: "videos",
//     },
//   ]),
//   async (req, res) => {
//     // console.log(req.body);
//     const { name, ingredients, instructions, cookingTime, userOwner } =
//       req.body;
//     /////////////////

//     ///////////////////////////
//     let videosPaths = [];

//     if (Array.isArray(req.files.videos) && req.files.videos.length > 0) {
//       for (let video of req.files.videos) {
//         videosPaths.push(video.path);
//         // videosPaths.push('/' + video.path);
//       }
//     }
//     try {
//       const createMedia = await RecipeModel.create({
//         videos: videosPaths,
//         name,
//         ingredients,
//         instructions,
//         cookingTime,
//         userOwner,
//       });
//       /////////////////

//       //////////////////////////

//       res.json({ message: "media created succefully", createMedia });
//     } catch (error) {
//       console.log(error);
//       res.status(400).json(error);
//     }
//   }
// );
// //////////////////////// ///

// router.put("/updaterecipe/:recipeId", async (req, res) => {
//   const { name, ingredients, instructions, cookingTime } = req.body;
//   const recipeID = req.params.recipeId;
//   try {
//     const recipe = await RecipeModel.findByIdAndUpdate(
//       recipeID,
//       { name, ingredients, instructions, cookingTime },
//       { new: true }
//     ); // Adding { new: true } to return the updated document
//     if (!recipe) {
//       return res.status(404).json({ message: "Recipe not found" }); // Sending 404 if recipe is not found
//     }
//     res.status(200).json({ message: "Recipe updated successfully", recipe }); // Sending success response
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" }); // Sending 500 for any other error
//   }
// });

// ///////////////////////////////////////

// router.delete("/deleterecipe/:recipeId", async (req, res) => {
//   const recipeID = req.params.recipeId;

//   try {
//     const recipe = await RecipeModel.findByIdAndDelete(recipeID);

//     if (!recipe) {
//       return res.status(404).json({ message: "Recipe not found" });
//     }

//     return res.status(200).json({ message: "Recipe deleted successfully" });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

// //////////////////////////////

// router.get("/username/:id", async (req, res) => {
//   const username = await UserModel.findById(req.params.id);
//   try {
//     res.json(username);
//   } catch (err) {
//     console.log(err);
//   }
// });

// ////////////////////////
// router.get("/user/:id", async (req, res) => {
//   const userId = req.params.id;

//   let userRecipe;
//   try {
//     userRecipe = await UserModel.findById(userId).populate("RecipeModel");
//   } catch (err) {
//     console.log(err);
//   }
//   return res.status(200).json({ userOwner: userId });
// });
// /////////////

// /////////////////////////////////
// export { router as recipesRouter };

import express from "express";
import { UserModel } from "../models/Users.js";
import { RecipeModel } from "../models/Recipes.js";
import { CommentModel } from "../models/Comments.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();
/////////////////////

router.get("/recipereport", async (req, res) => {
  try {
    const response = await RecipeModel.find().populate(
      "userOwner",
      " username"
    );
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

///////////////////////
router.get("/", async (req, res) => {
  try {
    const response = await RecipeModel.find()
      .sort({ createdAt: -1 })
      .populate("userOwner", " username")
      .populate("commentId", "comment");
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});
/////////////////////////////
router.get("/trending", async (req, res) => {
  try {
    const response = await RecipeModel.find({
      $expr: { $gt: [{ $size: "$likes" }, 1] },
    })
      .sort({ createdAt: -1 })
      .populate("userOwner", " username")
      .populate("commentId", "comment");
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});
//////////////////////////////////////////

router.put("/", async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);
    user.savedRecipes.push(recipe);
    await user.save();
    res.json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    res.json(err);
  }
});

///////////////////

router.get("/savedRecipes/ids/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    res.json({ savedRecipes: user?.savedRecipes });
  } catch (err) {
    res.json(err);
  }
});
///////////////////////////
router.get("/savedRecipes/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    const savedRecipes = await RecipeModel.find({
      _id: { $in: user.savedRecipes },
    });
    res.json({ savedRecipes });
  } catch (err) {
    res.json(err);
  }
});
/////////////////////////

router.get("/all", async (req, res) => {
  try {
    const recipe = await RecipeModel.find();
    res.json(recipe);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});
// router.get("/all", mediaController.getAll);

router.get("/myrecipe/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const mymedia = await RecipeModel.find({ userOwner: userId })
      .sort({ createdAt: -1 })
      .populate("userOwner", " username");
    res.json(mymedia);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

///////////////////////////////////////////
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // C:\CollegeProject\api\public
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public");
    }
    if (!fs.existsSync("public/videos")) {
      fs.mkdirSync("public/videos");
    }
    cb(null, "./public/videos");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);

    if (ext !== ".mkv" && ext !== ".mp4") {
      return cb(new Error("Only videos are allowed!"));
    }
    cb(null, true);
  },
});

router.post(
  "/create",
  upload.fields([
    {
      name: "videos",
    },
  ]),
  async (req, res) => {
    const { name, ingredients, instructions, cookingTime, userOwner } =
      req.body;
    /////////////////
    ///////////////////////////
    let videosPaths = [];

    if (Array.isArray(req.files.videos) && req.files.videos.length > 0) {
      for (let video of req.files.videos) {
        videosPaths.push(video.path);
      }
    }
    try {
      const createMedia = await RecipeModel.create({
        videos: videosPaths,
        name,
        ingredients,
        instructions,
        cookingTime,
        userOwner,
      });
      /////////////////

      await UserModel.updateOne(
        { _id: userOwner },
        { $push: { recipes: createMedia._id } }
      ).exec();

      //////////////////////////
      res.json({ message: "media created succefully", createMedia });
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
);
//////////////////////// ///

router.get("/getrecipe/:recipeId", async (req, res) => {
  const Id = req.params.recipeId;
  const recipe = await RecipeModel.findById(Id).populate(
    "userOwner",
    "username"
  );
  try {
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: "Error getting the recipe" });
  }
});

////////////////////////////////////////

router.put("/updaterecipe/:recipeId", async (req, res) => {
  const { name, ingredients, instructions, cookingTime } = req.body;
  const recipeID = req.params.recipeId;
  try {
    const recipe = await RecipeModel.findByIdAndUpdate(
      recipeID,
      { name, ingredients, instructions, cookingTime },
      { new: true }
    ); // Adding { new: true } to return the updated document
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" }); // Sending 404 if recipe is not found
    }
    res.status(200).json({ message: "Recipe updated successfully", recipe }); // Sending success response
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" }); // Sending 500 for any other error
  }
});

///////////////////////////////////////

router.delete("/deleterecipe/:recipeId", async (req, res) => {
  const recipeID = req.params.recipeId;

  try {
    const recipe = await RecipeModel.findByIdAndDelete(recipeID);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Check if 'videosPaths' exist before trying to access it
    if (recipe.videosPaths && recipe.videosPaths.length > 0) {
      recipe.videosPaths.forEach((videoPath) => {
        try {
          const filePath = path.join(__dirname, "public", videoPath);
          // Delete the file
          fs.unlinkSync(filePath);
          console.log(`Deleted file: ${filePath}`);
        } catch (err) {
          console.error("Error deleting file:", err);
        }
      });
    }

    return res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//////////////////////////////

router.get("/username/:id", async (req, res) => {
  const username = await UserModel.findById(req.params.id);
  try {
    res.json(username);
  } catch (err) {
    console.log(err);
  }
});

//////////////////////////

router.put("/user/:id", async (req, res) => {
  const { name, username, phone, email, about } = req.body;
  const id = req.params.id;

  try {
    const existUser = await UserModel.findOne({ username });

    if (existUser) {
      return res.json({ message: "exists" });
    } else {
      const user = await UserModel.findByIdAndUpdate(
        id,
        { name, username, phone, email, about },
        { new: true, runValidators: true }
      );

      if (!user) {
        return res.status(404).json({ message: "Account not found" });
      }

      res.status(200).json({ message: "Account updated successfully", user });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

////////////////////////
router.get("/user/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    let userRecipe;
    userRecipe = await UserModel.findById(userId).populate("RecipeModel");
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json({ userOwner: userId });
});
/////////////

router.put("/like/:id", async (req, res) => {
  const id = req.params.id;
  const userId = req.body.userID;

  try {
    // const checkUser = await RecipeModel.find({_id:id,likes:"660027c041eb263a555c2d55"});

    const likeData = await RecipeModel.findByIdAndUpdate(
      id,
      { $push: { likes: userId } },
      { new: true }
    ).populate("userOwner", "username");
    res.json(likeData);
  } catch (err) {
    res.json({ message: "error" });
  }
});
///////////////////////
router.put("/dislike/:id", async (req, res) => {
  const id = req.params.id;
  const userId = req.body.userID;

  try {
    const likeData = await RecipeModel.findByIdAndUpdate(
      id,
      { $pull: { likes: userId } },
      { new: true }
    ).populate("userOwner", "username");

    res.json(likeData);
  } catch (err) {
    res.json({ message: "error" });
  }
});
////////////////////////////////

router.post("/comment/add/:id", async (req, res) => {
  const id = req.params.id;
  const { userId, owner, comment } = req.body;

  try {
    const commented = await CommentModel.create({
      recipeId: id,
      userOwner: userId,
      user: owner,
      comment,
    });
    await RecipeModel.updateOne(
      { _id: id },
      { $push: { commentId: commented._id } },
      { new: true }
    );
    // .exec();
    const cmtUpdate = await RecipeModel.findById(id).populate(
      "userOwner",
      "username"
    );
    res.status(200).json(cmtUpdate);
  } catch (err) {
    res.json(err).status(500);
  }
});

////////////////////////

router.get("/comment/:id", async (req, res) => {
  const id = req.params.id;
  const comments = await CommentModel.findById(id)
    .populate("recipeId")
    .populate("user", "username");
  res.json(comments);
});

/////////////////////////////////
export { router as recipesRouter };
