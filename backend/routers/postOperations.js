const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authController = require("../controllers/authController");

router.get(
  "/likePost/:postId",
  authController.protect,
  postController.likePost
);

module.exports = router;
