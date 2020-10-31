const express = require("express");
const http = require("http");
const socketio = require("socket.io");
var cors = require("cors");
const mongoose = require("mongoose");

const { MONGO_URI } = require("./src/config/mongodb");
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

const app = express();
const server = http.createServer(app);
const io = socketio(server);
exports.io = io;
app.use(cors(corsOptions));

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Set-Cookie,Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

const port = process.env.port || 3001;
let rooms = [];

io.on("connection", require("./src/socket/socket").Socket);

app.post("/newRoom", (req, res) => {});

app.get("/getRooms", (req, res) => {
  res.send(rooms);
});

const userRoutes = require("./src/routes/user.routes");
const roomRoutes = require("./src/routes/room.routes");
const messageRoutes = require("./src/routes/message.routes");

app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/messages", messageRoutes);

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
