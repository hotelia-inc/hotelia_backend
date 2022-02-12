const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const Hotel = require("../models/hotelModel.js");

// @desc     Fetch all hotels
// @route    GET /api/hotels
// @access   Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const hotels = Hotel.find({}, function (err, docs) {
      res.json(docs);
    });
  })
);

// @desc     Fetch single hotel
// @route    GET /api/hotels/:id
// @access   Public
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const hotel = await Hotel.findById(req.params.id);

    if (hotel) {
      res.json(hotel);
    } else {
      res.status(404);
      throw new Error("Hotel not found");
    }
  })
);

module.exports = router;
