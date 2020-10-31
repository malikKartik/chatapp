const Room = require("../models/room.model");
const User = require("../models/user.model");

const mongoose = require("mongoose");
const { findOneAndUpdate } = require("../models/room.model");

exports.createRoom = async (req, res, next) => {
  try {
    const room = new Room({
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
      description: req.body.description,
      admin: req.body.creator,
    });
    console.log(room._id);
    await room.save();
    await User.findOneAndUpdate(
      { _id: req.body.creator },
      { $push: { rooms: room._id } }
    );
    res.send(room);
  } catch (err) {
    console.log(err);
    res.status(501).json({ code: "--", Error: err });
  }
};

exports.join = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const roomId = req.body.roomId;
    const user = await User.find({ _id: userId });
    if (user[0].rooms.includes(roomId))
      throw { code: "--", Error: "You are already a member of the room!" };
    await User.findOneAndUpdate({ _id: userId }, { $push: { rooms: roomId } });
    res.send({ message: "Joined!" });
  } catch (err) {
    console.log(err);
    res.status(501).json({ code: "--", Error: err });
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.send(rooms);
  } catch (err) {
    res.send(err);
  }
};
