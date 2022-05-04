const express = require("express");
const router = express.Router();
const authService = require("../middleware/verifyToken");
const postsController = require("../controllers/posts");

router.get("/posts/", [authService], postsController.list);
router.post("/posts/add", [authService], postsController.newPost);
// router.put("posts/:id/edit", postsController.updateposts);
// router.delete("posts/:id/delete", postsController.deleteposts);
// router.get("/:id", postsController.findposts);
