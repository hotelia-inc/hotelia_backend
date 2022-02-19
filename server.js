import http from "http";
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { Server } from "socket.io";
import logger from "morgan";
import cors from "cors";
import WebSockets from "./utils/WebSockets.js";
import { decode } from "./middlewares/jwt.js";
import indexRouter from "./routes/index.js";
import userRouter from "./routes/user.js";
import chatRoomRouter from "./routes/chatRoom.js";
import deleteRouter from "./routes/delete.js";
import hotelRouter from "./routes/hotel.js";
import connectDB from "./config/db.js";
const app = express();

dotenv.config();
connectDB();

const port = process.env.PORT || 5000;
app.set("port", port);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/images", express.static("public/images"));
app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/room", decode, chatRoomRouter);
app.use("/delete", deleteRouter);
app.use("/api/hotels", hotelRouter);
app.get("*", (req, res) => {
  res.send("Welcome to Hotelia");
});

//Create http server
const server = http.createServer(app);
const socketio = new Server(server);
//create socket connction
global.io = socketio.listen(server);
global.io.on("connection", WebSockets.connection);
server.listen(port);
server.on("listening", () => {
  console.log(`Listening on port:: http://localhost:${port}/`);
});
