import mongoose from "mongoose";

const hotelSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    address: {
      streetAddress: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      gpsCoordinates: {
        longitude: {
          value: {
            type: String,
            required: true,
          },
          cardinalPoints: {
            type: String,
            required: true,
          },
        },
        latitude: {
          value: {
            type: String,
            required: true,
          },
          cardinalPoints: {
            type: String,
            required: true,
          },
        },
      },
    },
    room: {
      roomTypes: [
        {
          name: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
          numberOfRooms: {
            type: Number,
            required: true,
          },
          isAvailable: {
            type: Boolean,
            required: true,
          },
        },
      ],
    },
    hotelFeatures: {
      hasRestaurant: {
        type: Boolean,
        required: true,
      },
      hasBarLounge: {
        type: Boolean,
        required: true,
      },
      hasSecurity: {
        type: Boolean,
        required: true,
      },
      hasWirelessInternet: {
        type: Boolean,
        required: true,
      },
      hasAdequateParking: {
        type: Boolean,
        required: true,
      },
      hasLuggageStorage: {
        type: Boolean,
        required: true,
      },
      hasAirCondtioning: {
        type: Boolean,
        required: true,
      },
      hasRefridgerator: {
        type: Boolean,
        required: true,
      },
      hasATM: {
        type: Boolean,
        required: true,
      },
      hasRoomService: {
        type: Boolean,
        required: true,
      },
      hasToiletries: {
        type: Boolean,
        required: true,
      },
      hasPrivateBathrooms: {
        type: Boolean,
        required: true,
      },
      hasCableTV: {
        type: Boolean,
        required: true,
      },
      has24HourFrontDesk: {
        type: Boolean,
        required: true,
      },
      hasSwimmingPool: {
        type: Boolean,
        required: true,
      },
      hasGym: {
        type: Boolean,
        required: true,
      },
      hasDinner: {
        type: Boolean,
        required: true,
      },
      hasOutDoorPool: {
        type: Boolean,
        required: true,
      },
      hasTaxiService: {
        type: Boolean,
        required: true,
      },
    },

    hotelPolicy: {
      checkIn: {
        type: String,
        required: true,
      },
      checkOut: {
        type: String,
        required: true,
      },
      payment: {
        type: Array,
        required: true,
      },
      cancelation: {
        type: String,
        required: true,
      },
    },
    hotelType: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      required: true,
    },
    images: {
      mainImageUrl: {
        type: String,
        required: true,
      },
      imageGallery: [
        {
          type: String,
          required: false,
        },
      ],
    },
  },
  { timestamps: true }
);

const Hotel = mongoose.model("Hotel", hotelSchema);
export default Hotel;

/*

const reviewRatingSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    reviewerEmail: { type: String, required: true },
    title: { type: String, required: false },
    comment: { type: String, required: true },
    tripType: { type: String, required: false },
    rating: {
      cleanliness: { type: Number, required: true },
      comfort: { type: Number, required: true },
      serviceQuality: { type: Number, required: true },
      security: { type: Number, required: true },
      location: { type: Number, required: true },
    },
    starRating: { type: Number, required: true },
    dateTime: { type: Number, required: true },
    budgetRange: { type: Number, required: true },
  },
  { timestamps: true }
);
*/
