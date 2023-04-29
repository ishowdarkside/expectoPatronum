const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authController = require("../controllers/authController");
const multer = require("multer");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

//current user creating post
router.post(
  "/",
  authController.protect,
  upload.single("postFile"),
  postController.resizePhoto,
  postController.createPost
);
//get all posts from currently logged in user
router.get("/", authController.protect, postController.getPostCurrUser);
//get single post by its id
router.get("/:postId", authController.protect, postController.getSinglePost);
//delete single post by its id
router.delete(
  "/:postId",
  authController.protect,
  postController.deleteSinglePost
);

//get posts from selected user (from paramter that contains id);
router.get(
  "/user/:userId",
  authController.protect,
  postController.getPostsParamUser
);

//get posts from users current User follows
router.get(
  "/getPostsFollowers/getData",
  authController.protect,
  postController.getPostsFollowers
);

module.exports = router;
