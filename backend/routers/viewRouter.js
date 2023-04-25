const express = require("express");
const router = express.Router();
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

router.get(
  "/register",
  authController.restrictRegLog,
  viewController.renderRegister
);

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

router.get(
  "/findUser",
  authController.protect,
  userController.findUsers,
  viewController.renderFindUser
);

//NEXT STEP GET USER ID WHEN USER CLICKS ON CERTAIN USER AND DISPLAY USERS DATA IF PUBLIC ELSE DISPLAY PRIVATE
router.get("/findUser:userId", authController.protect);

module.exports = router;
