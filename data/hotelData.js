const { faker } = require("@faker-js/faker");

let hotels = [];
for (let i = 0; i < 10; i++) {
  const hotelmodel = {
    name: faker.company.companyName() + " Hotel",
    address: {
      streetAddress: faker.address.streetAddress(),
      city: faker.address.cityName(),
      state: faker.address.state(),
      gpsCoordinates: {
        longitude: {
          value: faker.address.longitude(),
          cardinalPoints: faker.address.cardinalDirection(),
        },

        latitude: {
          value: faker.address.latitude(),
          cardinalPoints: faker.address.cardinalDirection(),
        },
      },
    },

    room: {
      roomTypes: [
        {
          name: faker.word.adjective(),
          price: Math.random() * (20000 - 3000) + 3000,
          isAvailable: faker.datatype.boolean(),
          numberOfRooms: faker.datatype.number(),
        },
      ],
    },
    hotelFeatures: {
      hasRestaurant: faker.datatype.boolean(),
      hasBarLounge: faker.datatype.boolean(),
      hasSecurity: faker.datatype.boolean(),
      hasWirelessInternet: faker.datatype.boolean(),
      hasAdequateParking: faker.datatype.boolean(),
      hasLuggageStorage: faker.datatype.boolean(),
      hasAirCondtioning: faker.datatype.boolean(),
      hasRefridgerator: faker.datatype.boolean(),
      hasATM: faker.datatype.boolean(),
      hasRoomService: faker.datatype.boolean(),
      hasToiletries: faker.datatype.boolean(),
      hasPrivateBathrooms: faker.datatype.boolean(),
      hasCableTV: faker.datatype.boolean(),
      has24HourFrontDesk: faker.datatype.boolean(),
      hasSwimmingPool: faker.datatype.boolean(),
      hasGym: faker.datatype.boolean(),
      hasSecurityGuard: faker.datatype.boolean(),
      hasDinner: faker.datatype.boolean(),
      hasOutDoorPool: faker.datatype.boolean(),
      hasTaxiService: faker.datatype.boolean(),
    },
    hotelPolicy: {
      checkIn: "9:00am",
      checkOut: "12:00 pm",
      payment: ["Cash", "Cards", "Bank Transfer"],
      cancelation: "Free 24 Hours Cancelation",
    },
    hotelType: "Mid-Range",
    likes: faker.datatype.number(),
    images: {
      mainImageUrl: faker.image.imageUrl(),
      imageGallery: [
        faker.image.imageUrl(),
        faker.image.imageUrl(),
        faker.image.imageUrl(),
        faker.image.imageUrl(),
      ],
    },
  };
  hotels.push(hotelmodel);
}

module.exports = hotels;

/*
const review = {
  _id: faker.datatype.uuid(),
  name: faker.name.findName(),
  reviewerEmail: faker.internet.email(),
  title: faker.word.adverb(),
  comment: "",
  tripType: "",
  rating: {
    averageRating: 8.9,
    metric: {
      cleanliness: 7.9,
      comfort: 5.6,
      serviceQuality: 5.8,
      security: 7.8,
      location: 6.5,
    },
    starRating: 4,
  },
  dateTime: "",
  budgetRange: "",
};
*/
