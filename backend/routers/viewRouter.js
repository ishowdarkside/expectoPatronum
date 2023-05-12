const express = require("express");
const router = express.Router();
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");

router.get(
  "/register",
  authController.restrictRegLog,
  viewController.renderRegister
);

router.get("/login", authController.restrictRegLog, viewController.renderLogin);
router.get(
  "/main",
  authController.protect,
  userController.fetchCEO,
  postController.getPostsFollowers,
  viewController.renderMain
);

router.get(
  "/",
  authController.protect,
  postController.getPostsFollowers,
  userController.fetchCEO,
  viewController.renderMain
);

router.get(
  "/settings",
  authController.protect,
  userController.fetchCEO,
  viewController.renderSettings
);

router.get(
  "/me",
  authController.protect,
  userController.fetchCEO,
  viewController.renderMe
);
router.get(
  "/createPost",
  authController.protect,
  userController.fetchCEO,
  viewController.renderCreatePost
);

router.get(
  "/findUser",
  authController.protect,
  userController.findUsers,
  userController.fetchCEO,
  viewController.renderFindUser
);

//NEXT STEP GET USER ID WHEN USER CLICKS ON CERTAIN USER AND DISPLAY USERS DATA IF PUBLIC ELSE DISPLAY PRIVATE
router.get(
  "/findUser/:userId",
  authController.protect,
  userController.getUserData,
  userController.fetchCEO,
  viewController.renderSearchedUser
);

router.get(
  "/notifications",
  authController.protect,
  userController.populateRequests,
  userController.fetchCEO,
  viewController.renderNotifications
);

router.get(
  "/post/:postId",
  authController.protect,
  postController.attachPostData,
  userController.fetchCEO,
  viewController.renderPost
);
module.exports = router;
