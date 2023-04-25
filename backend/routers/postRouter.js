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

router.post(
  "/",
  authController.protect,
  upload.single("postFile"),
  postController.resizePhoto,
  postController.createPost
);

router.get("/", authController.protect, postController.getPostCurrUser);
router.get("/:postId", authController.protect, postController.getSinglePost);
router.delete(
  "/:postId",
  authController.protect,
  postController.deleteSinglePost
);
module.exports = router;
