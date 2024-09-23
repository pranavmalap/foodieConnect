import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    about: { type: String, default: "This is My cooking Account" },
    password: { type: String, required: true },
    savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipes" }],
    recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipes" }],
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model("users", UserSchema);
