const Booking = require("../models/booking");

const isAvailable = (bookingDates, bookingDate) => {
  for (let index = 0; index < bookingDates.length; index++) {
    const date = bookingDates[index];
    return (
      bookingDate.checkOut < date.checkIn || bookingDate.checkIn > date.checkOut
    );
  }
};

module.exports = { isAvailable };
