const mongoose = require("mongoose");

const listingSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    location: {
      type: String,
    },
    price: {
      type: Number,
    },
    type: {
      type: String,
    },
  },
  { timestamps: true }
);

listingSchema.virtual("bookings", {
  ref: "Booking",
  localField: "_id",
  foreignField: "listing",
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
