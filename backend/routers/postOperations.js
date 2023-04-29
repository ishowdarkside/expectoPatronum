const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authController = require("../controllers/authController");

router.get(
  "/likePost/:postId",
  authController.protect,
  postController.likePost
);

router.post(
  "/createComment/:postId",
  authController.protect,
  postController.createComment
);

router.delete(
  "/:postId/:commentId",
  authController.protect,
  postController.deleteComment
);

module.exports = router;
