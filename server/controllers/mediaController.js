import { RecipeModel } from "../models/Recipes.js";

export const getAll = async (req, res) => {
  try {
    const media = await RecipeModel.find();
    res.json(media);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const getUser = async (req, res) => {
  try {
    const mymedia = await RecipeModel.find({ username: "jeevan" });
    // console.log(mymedia)
    res.json(mymedia);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const create = async (req, res) => {
  // console.log(req.body);
  const { name , ingredients, instructions , cookingTime , userOwner } = req.body;
  let videosPaths = [];

  if (Array.isArray(req.files.videos) && req.files.videos.length > 0) {
    for (let video of req.files.videos) {
      videosPaths.push(video.path);
      // videosPaths.push('/' + video.path);
    } 
  }
  try {
    const createMedia = await RecipeModel.create({
      videos: videosPaths, name , ingredients, instructions , cookingTime , userOwner
      
    });
    res.json({ message: "media created succefully", createMedia });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const mediaController = {
  getAll,
  getUser,
  create,
};
