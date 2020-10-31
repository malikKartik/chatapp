const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: Number },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
});

module.exports = mongoose.model("User", userSchema);
