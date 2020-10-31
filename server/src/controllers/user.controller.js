const mongoose = require("mongoose");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "The Secret!!!";

exports.signup = async (req, res, next) => {
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 8);
    let user = new User({
      _id: mongoose.Types.ObjectId(),
      username: req.body.username,
      password: hashedPass,
      phone: req.body.phone,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      rooms: [],
    });
    const users = await User.find({ username: req.body.username });
    if (users.length > 0)
      throw { code: "NA001", message: "User already exists!" };
    await user.save();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(501).json({ Error: err });
  }
};

exports.login = async (req, res, next) => {
  try {
    const password = req.headers.password;
    const username = req.headers.username;
    const user = await User.findOne({ username });
    const correctPass = bcrypt.compare(password, user.password);
    if (!correctPass) {
      throw { code: "IC100", message: "Incorrect credentials!" };
    }
    const token = jwt.sign({ username, _id: user._id }, secret);
    res.json({
      token,
      _id: user._id,
      username,
      firstName: user.firstName,
      lastName: user.lastName,
      rooms: user.rooms,
      phone: user.phone,
    });
  } catch (err) {
    console.log(err);
    res.status(501).json({ Error: err });
  }
};

exports.me = async (req, res, next) => {
  try {
    const users = await User.find({ _id: req.headers.userid }).populate(
      "rooms"
    );
    res.send(users[0]);
  } catch (err) {
    res.send(err);
  }
};
