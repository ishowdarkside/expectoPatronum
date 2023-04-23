const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const multer = require("multer");
const sharp = require("sharp");

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

router.post("/signup", authController.signup);
router.get("/confirmAccount/:token", authController.confirmAccount);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.post("/resetPassword/:token", authController.resetPassword);
router.patch(
  "/me",
  authController.protect,
  upload.single("profilePicture"),
  userController.resizePhoto,
  userController.updateMe
);
router.patch(
  "/changePassword",
  authController.protect,
  userController.changePassword
);
module.exports = router;
