require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const Post = require("./models/post");
// const multer = require("multer");
const mongoose = require("mongoose");

// db.createUser({ user: "foo", pwd: "bar", roles: [{ role: "dbOwner", db: "todos" }] })
const user = process.env.MONGO_USER;
const pass = process.env.MONGO_PASS;
const cluster = process.env.MONGO_URL;
const db = process.env.MONGO_DB;
const {
  hashPassword,
  comparePasswords,
  createToken,
} = require("./services/authService");

mongoose
  .connect(`mongodb://${cluster}/${db}`, {
    pass,
    user,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((e) => console.log(e, "Connexion à MongoDB échouée !"));

const postsRoutes = require("./routes/posts");
// const imageFilter = (req, file, callBack) {

// }
// const upload = multer({
//   dest: "./upload/images",
//   imageFilter,
//   limits: { filesize: 5000000 }, // taille de l'image limitée à 500K
// });
const app = express();
// console.log(__dirname);
// console.log(path.join(__dirname + "/upload"));
app.use(express.json());
app.use("/upload", express.static(path.join(__dirname, "/upload")));
app.use("/posts", express.static(path.join(__dirname, "/upload")));

app.use(
  cors({
    origin: "http://localhost:8080",
  })
);

// Verification Token
const verifyUserAccess = async (req, res, next) => {
  // console.log(req.headers["authorization"]);
  let token = req.headers["authorization"].split(" ")[1];
  // console.log(token);
  if (!token) return res.status(403).send({ message: "No token provided!" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send({ message: "Unauthorized!" });
    req.user = { ...decoded };
    next();
  });
};
// Verification des authorisations
const verifyUserRole = async (req, res, next) => {
  let userId = req.user.data.email;
  let confirmUser = await User.findOne({ _id: userId }, { email: 1 });

  console.log(confirmUser._id, confirmUser.email);
  if (!confirmUser) return res.status(404).send({ message: "User not found!" });
  if (confirmUser.email !== userId)
    return res.status(401).send({ message: "Unauthorized Access!" });
  next();
};

//INSCRIPTION
app.post("/auth/signUp", async (req, res) => {
  console.log(req.body);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  console.log(emailPattern.test(req.body.email));
  if (emailPattern.test(req.body.email)) {
    try {
      const hashedPassword = await hashPassword(req.body.password);
      await User.create({
        email: req.body.email,
        password: hashedPassword,
      });
      res
        .status(201)
        .send({ success: true, message: "User created successfully" });
    } catch (err) {
      console.log(err);
      if (err) {
        if (err.code === 11000) {
          // Duplicate user
          return res.send({ success: false, message: "User already exist!" });
        }
        // Some other error
        return res.send({ success: false, message: "User creation failed" });
      }
    }
  }
});

// CONNEXION
app.post("/auth/signIn", async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });
    let hashedPassword = await User.findOne({ email: email }, { password: 1 });
    console.log(hashedPassword);
    let isValidPassword = await comparePasswords(
      password,
      hashedPassword.password
    );
    let token = createToken({ id: user._id });

    if (!user) return res.status(404).send({ message: "User introuvable !" });
    if (!isValidPassword)
      return res
        .status(401)
        .send({ accessToken: null, message: "Mot de passe incorrect !" });

    res
      .status(200)
      .send({ accessToken: token, id: user._id, avatar: user.avatar });
  } catch (err) {
    console.log(err);
  }
});

app.get("/auth/user/profil", [verifyUserAccess], async (req, res) => {
  try {
    // console.log(req.user.data.id);
    // console.log(req.params);
    let userData = await User.findOne({ _id: req.user.data.id });
    res.status(200).send(userData);
  } catch (err) {
    console.log(err);
  }
});

// Liste de tous les Posts
app.get("/auth/posts", [verifyUserAccess], async (req, res) => {
  console.log("list of all posts");
  console.log(req.body.id);
  try {
    //Preciser les Posts appartenant au user avec l'id
    let postsList = await Post.find();
    console.log(postsList);

    res.status(200).send(postsList);
  } catch (err) {
    console.log(err);
  }
});

// Liste de tous les Posts du user
app.get(
  "/auth/posts/:id",
  [verifyUserAccess, verifyUserRole],
  async (req, res) => {
    try {
      console.log("list of user's posts");
      console.log(req.body);
    } catch (err) {
      console.log(err);
    }
  }
);

// Add a Post
app.post(
  "/auth/posts/add",
  [verifyUserAccess, verifyUserRole],
  async (req, res) => {
    try {
      console.log("ajout envoyé");
      console.log(req.body);
    } catch (err) {
      console.log(err);
    }
  }
);

// Modify a Post
app.put(
  "/auth/posts/:id",
  [verifyUserAccess, verifyUserRole],
  async (req, res) => {
    try {
      console.log("post updated");
      console.log(req.body);
    } catch (err) {
      console.log(err);
    }
  }
);

// Delete a Post
app.delete(
  "/auth/posts/:id",
  [verifyUserAccess, verifyUserRole],
  async (req, res) => {
    try {
      console.log("delete ok");
      console.log(req.body);
    } catch (err) {
      console.log(err);
    }
  }
);

// Like a Post
app.post("/auth/posts/:id/like", async (req, res) => {
  try {
    console.log("post liked");
    console.log(req.body);
  } catch (err) {
    console.log(err);
  }
});

// creation des routes de l'app
// app.use("/ping", (req, res) => {
//   res.status(200).send("PING OK");
// });
// app.use("/api/v1/todos", todosRoutes);
// app.use('/api/v1/auth', authRoutes);

module.exports = app;
