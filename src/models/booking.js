const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    checkIn: {
      type: String,
      required: true,
    },
    checkOut: {
      type: String,
      required: true,
    },
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Listing", //Makes a reference to a user instance with the ID
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", //Makes a reference to a user instance with the ID
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
