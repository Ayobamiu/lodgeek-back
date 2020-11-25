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

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
