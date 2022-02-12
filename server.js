const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
//var hotelData = require("./data/hotels.js");
const hotelRoutes = require("./routes/hotelRoutes.js");
const connectDB = require("./config/db.js");
const app = express();

dotenv.config();
connectDB();

app.use("/images", express.static("public/images"));
app.use("/api/hotels", hotelRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to Hotelia");
});

app.listen(5000, console.log("Server is running on port 5000"));
