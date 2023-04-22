const express = require("express");
const router = express.Router();
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");

router.get("/register", viewController.renderRegister);
module.exports = router;

router.get("/login", viewController.renderLogin);
router.get("/main", authController.protect, viewController.renderMain);

router.get("/", authController.protect, viewController.renderMain);

router.get("/settings", authController.protect, viewController.renderMe);
