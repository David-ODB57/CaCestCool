const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  nom: {
    type: String,
    default: "",
  },
  prenom: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
    // minlength: 10,
  },
  avatar: {
    type: String,
    default: "http://localhost:3000/upload/avatars/default.png",
  },
});

module.exports = mongoose.model("User", userSchema);
