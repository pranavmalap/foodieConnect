import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
// import { dirname } from 'path';
import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.json());
app.use( 
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);
app.use("/public", express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:false}));

mongoose.connect(
  "mongodb+srv://foodieconnect07:pass123@cluster0.5d4uocc.mongodb.net/foodieconnect?retryWrites=true&w=majority",
  // "mongodb://localhost:27017/foodieconnect",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tls: true,
    ssl: true,
  }
);

app.listen(3001, () => console.log("Server Started...!"));
