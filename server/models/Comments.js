import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    recipeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "recipes",
    },
    userOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const CommentModel = mongoose.model("comment", CommentSchema);
