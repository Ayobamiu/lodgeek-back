const express = require("express");
const Booking = require("../models/booking");

const router = express.Router();

router.post("/bookings", async (req, res) => {
  try {
    const booking = new Booking(req.body);
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
    res.send({ bookingDates, bookingDate });
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
