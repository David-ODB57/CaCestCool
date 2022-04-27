const express = require("express");
const router = express.Router();

router.post("/posts/new", authService.verifyToken, postsController.newPost);
// router.post("/new", auth.verifyToken, postsController.newposts);
// router.get("/list", postsController.listpostss);
// router.get("/:id", postsController.findposts);
// router.put("/:id/edit", postsController.updateposts);
// router.delete("/:id/delete", postsController.deleteposts);
