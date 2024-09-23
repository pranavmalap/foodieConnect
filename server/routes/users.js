// import express from "express";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import { UserModel } from "../models/Users.js";
// import nodemailer from "nodemailer";

// const router = express.Router();

// router.post("/register", async (req, res) => {
//   const { username, email, phone, password } = req.body;

//   const user = await UserModel.findOne({ username });
//   if (user) {
//     return res.json({ message: "User already exists! " });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const newUser = new UserModel({
//     username,
//     email,
//     phone,
//     password: hashedPassword,

//   });
//   await newUser.save();

//   res.json({ message: "User register successfully..!" });
// });

// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;
//   const user = await UserModel.findOne({ username });

//   if (!user) {
//     return res.status(401).json({ message: "User Donsn't Exist!!" });
//   }

//   const isPasswordValid = await bcrypt.compare(password, user.password);

//   if (!isPasswordValid) {
//     return res
//       .status(401)
//       .json({ message: "username or password is incorrect!" });
//   }

//   const token = jwt.sign({ id: user._id }, "secret");
//   res.json({ token, userID: user._id });
// });

// router.post("/forgot-password", (req, res) => {
//   const { email } = req.body;
//   UserModel.findOne({ email: email }).then((user) => {
//     if (!user) {
//       return res.send({ Status: "user don't exist. " });
//     }
//     const token = jwt.sign({ id: user._id }, "jwt_secret_key", {
//       expiresIn: "1d",
//     });

//     var transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "foodieconnect07@gmail.com",
//         pass: "olvlxmtlkcasluhw",
//       },
//     });

//     var mailOptions = {
//       from: "FoodieConnect",
//       to: email,
//       subject: "Reset your password",
//       text: `http://localhost:5173/reset-password/${user._id}/${token}`,
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//         return res.status(500).send({ Status: "Failed to send email." });
//       } else {
//         return res.send({ Status: "Success" });
//       }
//     });
//   });
// });

// router.post("/reset-password/:id/:token", (req, res) => {
//   const { id, token } = req.params;
//   const { newPassword } = req.body;

//   jwt.verify(token, "jwt_secret_key", (err, decoded) => {
//     if (err) {
//       return res.json({ Status: "Error with Token" });
//     } else {
//       bcrypt
//         .hash(newPassword, 10)
//         .then((hash) => {
//           UserModel.findOneAndUpdate({ _id: id }, { password: hash })
//             .then((u) => {
//               if (!u) {
//                 return res.json({ Status: "User not found" });
//               }
//               res.send({ Status: "Success" });
//             })
//             .catch((err) => res.send({ Status: err }));
//         })
//         .catch((err) => res.send({ Status: err }));
//     }
//   });
// });

// export { router as userRouter };

import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, username, email, phone, password } = req.body;

  const user = await UserModel.findOne({
    $or: [{ username }, { email }, { phone }],
  });

  if (user) {
    return res.json({ message: "exists" });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      name,
      username,
      email,
      phone,
      password: hashedPassword,
    });
    await newUser.save();

    res.json({ message: "User register successfully..!" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.status(401).json({ message: "User Donsn't Exist!!" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res
      .status(401)
      .json({ message: "username or password is incorrect!" });
  }

  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, userID: user._id });
});

router.post("/forgot-password", (req, res) => {
  const { email } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.send({ Status: "user don't exist. " });
    }
    const token = jwt.sign({ id: user._id }, "/", {
      expiresIn: "1d",
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "foodieconnect07@gmail.com",
        pass: "olvlxmtlkcasluhw",
      },
    });

    var mailOptions = {
      from: "FoodieConnect",
      to: email,
      subject: "Reset your password",
      text: `http://localhost:5173/reset-password/${user._id}/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).send({ Status: "Failed to send email." });
      } else {
        return res.send({ Status: "Success" });
      }
    });
  });
});

router.post("/reset-password/:id/:token", (req, res) => {
  const { id, token } = req.params;
  const { newPassword } = req.body;

  jwt.verify(token, "jwt_secret_key", (err, decoded) => {
    if (err) {
      return res.json({ Status: "Error with Token" });
    } else {
      bcrypt
        .hash(newPassword, 10)
        .then((hash) => {
          UserModel.findOneAndUpdate({ _id: id }, { password: hash })
            .then((u) => {
              if (!u) {
                return res.json({ Status: "User not found" });
              }
              res.send({ Status: "Success" });
            })
            .catch((err) => res.send({ Status: err }));
        })
        .catch((err) => res.send({ Status: err }));
    }
  });
});

router.get("/", async (req, res) => {
  try {
    const resp = await UserModel.find();
    res.json(resp);
  } catch (err) {
    res.json({ message: "error" });
  }
});

router.get("/report/user", async (req, res) => {
  try {
    const response = await UserModel.find();
    res.json(response);
  } catch (error) {
    res.send(error);
  }
});

export { router as userRouter };
