const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

router.post("/signup", userController.signup);
router.get("/login", userController.login);
router.get("/me", userController.me);

module.exports = router;
