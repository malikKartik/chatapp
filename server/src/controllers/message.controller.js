const Message = require("../models/message.model");
const mongoose = require("mongoose");

exports.getRecent = async (req, res, next) => {
  try {
    const messages = await Message.find({ roomId: req.headers.roomid })
      .sort({ _id: -1 })
      .limit(10)
      .populate("from");
    res.send(messages);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

exports.getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ roomId: req.headers.roomid })
      .sort({ _id: -1 })
      .limit(10)
      .skip(parseInt(req.headers.skip))
      .populate("from");
    res.send(messages);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};
