require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
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

// const potsRoutes = require("./routes/posts");
// const imageFilter = (req, file, callBack) {

// }
// const upload = multer({
//   dest: "./images",
//   imageFilter,
//   limits: { filesize: 5000000 }, // taille de l'image limitée à 500K
// });
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:8080",
  })
);

// Verification Token
const verifyUserAccess = async (req, res, next) => {
  let token = res.headers["authorization"].split(" ")[1];

  if (!token) return res.status(403).send({ message: "No token provided!" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send({ message: "Unauthorized!" });
    req.user = { ...decoded };
    next();
  });
};
// Verification des authorisations
const verifyUserRole = async (req, res, next) => {
  let userId = req.user.data.id;
  let userData = await User.findOne({ _id: userId }, { role: 1 });

  if (!userData) return res.status(404).send({ message: "User not found!" });
  if (userData.role !== "admin")
    return res.status(401).send({ message: "Unauthorized Acces!" });

  next();
};

//INSCRIPTION
app.post("/signUp", async (req, res) => {
  try {
    console.log(req.body);
    const emailPattern = /^[a-aA-Z0-9._-]+@[a-aA-Z0-9.-]+\.[a-aA-Z]{2,4}$/;
    if (emailPattern.test(req.body.email)) {
      const hashedPassword = await hashPassword(req.body.password);
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      }).then(
        res
          .status(200)
          .send({ success: true, message: "User created successfully" })
      );
    }
  } catch (err) {
    console.log(err);
  }
});

// CONNEXION
app.post("/signIn", [verifyUserAccess, verifyUserRole], async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    let isUserExist = await User.findOne({ email: email });
    let hashedPassword = await User.findOne({ email: email }, { password: 1 });
    console.log(hashedPassword);
    let isValidPassword = await comparePasswords(
      password,
      hashedPassword.password
    );
    let token = createToken({ id: isUserExist._id });

    if (!isUserExist)
      return res.status(404).send({ message: "User not found!!" });
    if (!isValidPassword)
      return res
        .status(401)
        .send({ accessToken: null, message: "Mot de passe incorrect !" });

    res.status(200).send({ accessToken: token });
  } catch (err) {
    console.log(err);
  }
});

// creation des routes de l'app
app.use("/ping", (req, res) => {
  res.status(200).send("PING OK");
});
// app.use("/api/v1/todos", todosRoutes);
// app.use('/api/v1/auth', authRoutes);

module.exports = app;
