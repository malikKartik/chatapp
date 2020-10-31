const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", index: true },
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: String,
  time: { type: Date },
});

module.exports = mongoose.model("Message", messageSchema);
