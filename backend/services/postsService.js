//contrôleur de la route GET /posts
const Post = require("../models/post");
// const User = require("../models/user");

//Tous les POSTS du site
exports.list = () => {
  // on interroge la base de donnée
  return Post.find();
};

//Tous les POSTS du user
exports.listUserPosts = (userName) => {
  // on interroge la base de donnée
  return Post.find({ author: userName });
};
