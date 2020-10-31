const express = require("express");
const router = express.Router();

const messageController = require("../controllers/message.controller");

router.get("/recent", messageController.getRecent);

module.exports = router;
