const express = require("express");
const router = express.Router();
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");

router.get(
  "/register",
  authController.restrictRegLog,
  viewController.renderRegister
);
module.exports = router;

router.get("/login", authController.restrictRegLog, viewController.renderLogin);
router.get("/main", authController.protect, viewController.renderMain);

router.get("/", authController.protect, viewController.renderMain);

router.get(
  "/settings",
  authController.protect,

  viewController.renderSettings
);

router.get("/me", authController.protect, viewController.renderMe);
router.get(
  "/createPost",
  authController.protect,
  viewController.renderCreatePost
);
