const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const multer = require("multer");
const sharp = require("sharp");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, `${__dirname}/../../frontend/public/imgs`);
    },
    filename: (req, file, callback) => {
      callback(null, `${req.user._id}-${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

const convertToWebP = async (req, res, next) => {
  if (req.file && req.file.mimetype.startsWith("image")) {
    const data = await sharp(req.file.path).resize(500, 500).webp().toBuffer();
    req.file.mimetype = "image/webp";
    req.file.buffer = data;
    return next();
  }
  next();
};

router.post("/signup", authController.signup);
router.get("/confirmAccount/:token", authController.confirmAccount);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.post("/resetPassword/:token", authController.resetPassword);
router.patch(
  "/me",
  authController.protect,
  upload.single("profilePicture"),
  convertToWebP,
  userController.updateMe
);
router.patch(
  "/changePassword",
  authController.protect,
  userController.changePassword
);
module.exports = router;
