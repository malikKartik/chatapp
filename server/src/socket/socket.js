const io = require("../../index").io;
const Message = require("../models/message.model");
const mongoose = require("mongoose");

exports.Socket = (socket) => {
  socket.emit("connectedToServer");

  socket.on("hitFromClient", () => {
    console.log("Client!!");
    io.emit("serving");
  });

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
  });

  socket.on("messageRoom", async (roomId, message) => {
    try {
      const newMessage = new Message({
        _id: mongoose.Types.ObjectId(),
        roomId: roomId,
        from: message.userId,
        message: message.message,
        time: new Date(),
      });
      await newMessage.save().then((data) => {
        io.to(roomId).emit("messageFromRoom", message);
      });
    } catch (e) {
      console.log(e);
    }
  });

  socket.on("typing", (roomId, user) => {
    io.to(roomId).emit("typing", user);
  });

  socket.on("disconnecting", () => {
    const rooms = Object.keys(socket.rooms);
    console.log(socket);
  });
};
