const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  title: {
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
  image: {
    type: String,
    default: "",
  },
  likes: Number,
  comments: Number,
});

module.exports = mongoose.model("Posts", postSchema);
