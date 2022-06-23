const http = require("http");
const express = require("express");
const dotenv = require("dotenv");
const { Server } = require("socket.io");
const logger = require("morgan");
const cors = require("cors");
const WebSockets = require("./utils/WebSockets.js");
const userRouter = require("./routes/user.js");
const hotelRouter = require("./routes/hotel.routes.js");
const connectDB = require("./config/db.js");
const app = express();

dotenv.config();
connectDB();

const port = process.env.PORT || 5000;

app.set("port", port);
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/images", express.static("public/images"));
app.use("/users", userRouter);
app.use("/api/hotels", hotelRouter);
app.get("*", (req, res) => {
  res.send("Welcome to Hotelia");
});

//Create http server
const server = http.createServer(app);
const socketio = new Server(server);
//create socket connection
global.io = socketio.listen(server);
global.io.on("connection", WebSockets.connection);
server.listen(port);
server.on("listening", () => {
  console.log(`Listening on port:: http://localhost:${port}/`);
});
