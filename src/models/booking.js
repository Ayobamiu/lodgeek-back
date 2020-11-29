const mongoose = require("mongoose");
const bookingStatus = [
  "requestSent",
  "requestGrantedByHost",
  "requestRejectedByHost",
  "paid",
  "resumed",
  "confirmedByGuest",
  "rejectedByGuest",
  "acceptedByGuest",
  " completed",
];

const bookingSchema = mongoose.Schema(
  {
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
    checkIn: {
      type: String,
      required: true,
    },
    checkOut: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: bookingStatus,
      default: "requestSent",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
