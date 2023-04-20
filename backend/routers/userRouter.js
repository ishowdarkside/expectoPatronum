const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

router.post("/signup", authController.signup);
router.get("/confirmAccount/:token", authController.confirmAccount);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.post("/resetPassword/:token", authController.resetPassword);
router.patch("/me", authController.protect, userController.updateMe);
router.patch(
  "/changePassword",
  authController.protect,
  userController.changePassword
);
module.exports = router;
