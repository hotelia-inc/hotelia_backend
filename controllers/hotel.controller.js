const Hotel = require("../models/hotel.model.js");

module.exports = {
  // @desc     Fetch all hotels
  // @route    GET /api/hotels
  // @access   Public
  onGetAllHotels: async (req, res) => {
    try {
      const hotels = await Hotel.find({});
      if (hotels) {
        res.status(200).json(hotels);
      } else {
        res.status(404);
        throw new Error("No hotel found");
      }
    } catch (error) {
      res.status(500).json({ success: true, message: error.message });
    }
  },

  // @desc     Fetch single hotel
  // @route    GET /api/hotels/:id
  // @access   Public
  onGetHotelById: async (req, res) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      if (hotel) {
        res.stattus(200).json(hotel);
      } else {
        res.status(404);
        throw new Error("Hotel not found");
      }
    } catch (error) {
      res.status(500).json({ success: true, message: error.message });
    }
  },
};
