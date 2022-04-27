const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  // article est l'id de l'article auquel est rattaché le commentaire
  article: Number,
  author: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // Doit correspondre à l'avatar de l'auteur du commentaire
  avatar: String,
});

module.exports = mongoose.model("Comments", commentSchema);
