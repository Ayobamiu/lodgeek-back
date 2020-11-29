const express = require("express");
const { isAvailable } = require("../logic/booking");
const Booking = require("../models/booking");
const Listing = require("../models/listing");

const router = express.Router();

router.post("/bookings", async (req, res) => {
  try {
    const listing = await Listing.findById(req.body.listing);
    const booking = new Booking(req.body);
    if (listing.isInstantBooking) {
      booking.status = "requestGrantedByHost";
    }
    await booking.save();
    res.send(booking);
  } catch (error) {
    res.send(400).send(error);
  }
});

router.post("/bookings/check-availability", async (req, res) => {
  try {
    const bookings = await Booking.find({ listing: req.body.listing });
    if (!bookings) return res.status(404).send();

    const bookingDates = [];
    bookings.forEach((booking) => {
      bookingDates.push({
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
      });
    });
    const bookingDate = {
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut,
    };
    const status = isAvailable(bookingDates, bookingDate); // return true if room is not booked
    res.send({ bookingDates, bookingDate, isAvailable: status });
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.send(bookings);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
