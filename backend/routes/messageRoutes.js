const express = require("express");
const Message = require("../models/messagemodel");
const { authorize } = require("../middlewear/validateToken");

const router = express.Router();
const {
  sendMessage,
  getMessages,
} = require("../controllers/messageController");

router.get("/:id", authorize, getMessages);
router.post("/send/:id", authorize, sendMessage);

module.exports = router;
