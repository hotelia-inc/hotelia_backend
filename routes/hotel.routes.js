const express = require("express");
const hotel = require("../controllers/hotel.controller");

const router = express.Router();

router.get("/", hotel.onGetAllHotels);
router.get("/", hotel.onGetHotelById);

module.exports = router;
