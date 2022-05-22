const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  CreatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", commentSchema);
