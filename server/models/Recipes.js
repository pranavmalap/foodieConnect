import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema(
  {
    videos: [{ type: String, required: true }],
    name: { type: String, required: true },
    ingredients: { type: String, required: true },
    instructions: { type: String, required: true },
    cookingTime: { type: Number, required: true },
    userOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    commentId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const RecipeModel = mongoose.model("recipes", RecipeSchema);
// module.exports = recipes = mongoose.model("recipes", MediaSchema);
