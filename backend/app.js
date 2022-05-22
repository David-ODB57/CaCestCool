require("dotenv").config();
const express = require("express");
const { xss } = require("express-xss-sanitizer");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const Post = require("./models/post");
const Comment = require("./models/comment");
const multer = require("multer");
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
const comment = require("./models/comment");

mongoose
  .connect(`mongodb://${cluster}/${db}`, {
    pass,
    user,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((e) => console.log(e, "Connexion à MongoDB échouée !"));

// const postsRoutes = require("./routes/posts");

//MULTER CONFIG
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const origin = req.route.path;
    switch (origin) {
      case "/auth/user/profil/avatar":
        cb(null, path.join(__dirname, "/upload/avatars/"));
        break;
      case "/auth/user/posts/add":
        cb(null, path.join(__dirname, "/upload/images/"));
        break;
      case "/auth/user/posts/edit/:postId":
        cb(null, path.join(__dirname, "/upload/images/"));
        break;
      default:
        cb(null, path.join(__dirname, "/upload/"));
    }
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});

const imageFilter = (req, file, cb) => {
  const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(
      new Error("Seulement les formats .png, .jpg and .jpeg sont acceptés!")
    );
  }
};

const upload = multer({
  storage: storage,
  imageFilter,
  limits: { filesize: 2000000 }, // taille de l'image limitée à 2Mo
});
// END OF MULTER CONFIG

// Verification Token
const verifyUserAccessToken = (req, res, next) => {
  let token = req.headers["authorization"].split(" ")[1];
  if (!token) return res.status(403).send({ message: "Pas de token fourni!" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") throw new Error(err);
      return res.status(401).send({ message: "Authorisation refusée!" });
    }
    req.user = { ...decoded };
    console.log("req user from JWT SECRET DECODED", req.user);
    next();
  });
};
// Verification du User
const verifyUserId = async (req, res, next) => {
  const { email, password } = req.body;
  const userId = await User.findOne({ email: email });
  if (!userId) return res.status(404).send({ message: "Compte introuvable !" });

  const hashedPassword = await User.findOne({ email: email }, { password: 1 });
  const isValidPassword = await comparePasswords(
    password,
    hashedPassword.password
  );

  if (!isValidPassword || hashPassword?.password)
    return res.status(401).send({
      message: "Mot de passe incorrect !",
    });
  if (userId.email !== email)
    return res.status(401).send({ message: "Access interdit!" });
  next();
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());
app.use(["/upload", "/posts"], express.static(path.join(__dirname, "/upload")));

app.use(
  cors({
    origin: "http://localhost:8080",
  })
);
app.use("/auth", verifyUserAccessToken);

//INSCRIPTION
app.post("/signUp", async (req, res) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailPattern.test(req.body.email)) {
    try {
      const hashedPassword = await hashPassword(req.body.password);
      await User.create({
        email: req.body.email,
        password: hashedPassword,
      });
      res
        .status(201)
        .send({ success: true, message: "Compte créé avec succès" });
    } catch (err) {
      if (err.code === 11000) {
        // Doublon
        return res.send({
          success: false,
          message: "L'utilisateur existe déjà!",
        });
      }
      // Autres erreurs
      return res.status(404).send({
        success: false,
        message: "La création du compte a échoué ",
      });
    }
  }

  if (!emailPattern.test(req.body.email)) {
    res.status(404).send({
      success: false,
      message: "Veuillez saisir une adresse mail valide",
    });
  }
});

// CONNEXION
app.post("/signIn", verifyUserId, async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }, { password: 0 });
    let token = createToken({ id: user._id });
    console.log(token);
    res.status(200).send({
      accessToken: token,
      id: user._id,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      avatar: user.avatar,
    });
  } catch (err) {
    console.log(err);
  }
});

// USER PROFIL/ACCOUNT
app.get("/auth/user/profil", async (req, res) => {
  try {
    let userData = await User.findOne(
      { _id: req.user.data.id },
      { _id: 0, password: 0, __v: 0 }
    );
    res.status(200).send(userData);
  } catch (err) {
    console.log(err);
  }
});

// USER UPDATES
app.put(
  "/auth/user/profil/avatar",
  upload.single("avatar"),
  async (req, res) => {
    const id = req.user.data.id;
    const pathToImage = `http://localhost:3000/upload/avatars/${
      req.file.originalname
        ? req.file.originalname
        : "http://localhost:3000/upload/avatars/default.png"
    }`;
    const avatar = `${pathToImage}`;

    try {
      await User.updateOne({ _id: id }, { avatar: avatar });
      res.status(200).send({
        avatar: avatar,
        success: true,
        message: "Mise à jour réussie !",
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

app.put("/auth/user/profil/ids", async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.user.data.id },
      {
        $set: {
          nom: req.body.nom,
          prenom: req.body.prenom,
          email: req.body.email,
        },
      }
    );
    res.status(200).send({
      updatedInfo: req.body,
      success: true,
      message: "Mise à jour réussie !",
    });
  } catch (err) {
    console.log(err);
    return err;
  }
});

app.put("/auth/user/profil/pwd", async (req, res) => {
  try {
    const newPwd = req.body.password;
    const userId = req.user.data.id;
    const hash = await hashPassword(newPwd);
    await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          password: hash,
        },
      }
    );
    res.status(200).send({
      success: true,
      message: "Mise à jour réussie !",
    });
  } catch (err) {
    console.log(err);
    return err;
  }
});

// Liste de tous les Posts
app.get("/auth/posts", async (req, res) => {
  try {
    const postsList = await Post.find()
      .sort({ CreatedAt: "descending" })
      .populate("author", { avatar: 1 });
    res.status(200).send(postsList);
  } catch (err) {
    console.log(err);
    return res.status(404).send({ message: "Aucun document de trouvé ! " });
  }
});

// Liste de tous les Posts du user
app.get("/auth/posts/:id", async (req, res) => {
  try {
    const allUserPosts = await Post.find({ author: req.params.id })
      .sort({ CreatedAt: "descending" })
      .populate("author", { avatar: 1 });
    res.status(200).send(allUserPosts);
  } catch (err) {
    console.log(err);
    return res.status(404).send({ message: "Aucun document trouvé ! " });
  }
});
// Like a Post
app.put("/auth/posts/likes", async (req, res) => {
  try {
    const operator = req.body.operator;

    if (operator === "inc") {
      await Post.findOneAndUpdate(
        { _id: req.body.postId },
        {
          $addToSet: {
            usersLikedIt: req.body.userId,
          },
          $inc: { likes: 1 },
        }
      );
      const postLiked = await Post.findOne({ _id: req.body.postId });
      res.status(200).send(postLiked);
    } else {
      await Post.findOneAndUpdate(
        { _id: req.body.postId },
        {
          $pullAll: {
            usersLikedIt: [req.body.userId],
          },
          $inc: { likes: -1 },
        }
      );
      const postUnliked = await Post.findOne({ _id: req.body.postId });
      res.status(200).send(postUnliked);
    }
  } catch (err) {
    console.log(err);
    return res.status(404).send({ message: err });
  }
});

// Add a Post
app.post("/auth/user/posts/add", upload.single("image"), async (req, res) => {
  try {
    if (req.file !== undefined) {
      const post = new Post({
        title: req.body.title,
        body: req.body.body,
        image: `http://localhost:3000/upload/images/${req.file.originalname}`,
        author: req.body.author,
      });

      return await Post.create(post, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message ||
              "Une erreur inconnue est survenue lors de la creation.",
          });
        else res.status(201).send(data);
      });
    } else {
      const post = new Post({
        title: req.body.title,
        body: req.body.body,
        author: req.body.author,
      });
      return await Post.create(post, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message ||
              "Une erreur inconnue est survenue lors de la creation.",
          });
        else res.status(201).send(data);
      });
    }
  } catch (err) {
    console.log(err);
  }
});

// Edit a Post
app.put(
  "/auth/user/posts/edit/:postId",
  upload.single("image"),
  async (req, res) => {
    try {
      let dataToUpdate = {};

      for (const prop in req.body) {
        dataToUpdate[prop] = req.body[prop];
      }

      if (req.file !== undefined) {
        dataToUpdate[
          "image"
        ] = `http://localhost:3000/upload/images/${req.file.originalname}`;
      }

      // console.log(dataToUpdate);
      const updatedPost = await Post.findOneAndUpdate(
        { _id: req.params.postId },
        dataToUpdate,
        {
          new: true,
        }
      );
      return res.status(200).send(updatedPost);
    } catch (err) {
      console.log(err);
    }
  }
);

// Delete a Post
app.delete("/auth/user/posts/delete/:id", async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    return res.status(200).send("post supprimé avec succès");
  } catch (err) {
    console.log(err);
  }
});

// Add a Comment
app.post("/auth/user/:postId/comment", async (req, res) => {
  console.log("comment added !");
  try {
    const newComment = new Comment({
      post_id: req.params.postId,
      author: req.user.data.id,
      body: req.body.comment,
    });
    return await Comment.create(newComment, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message ||
            "Une erreur inconnue est survenue lors de la creation.",
        });
      else res.status(201).send(data);
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
