const cors = require("cors");
const express = require("express");
const userRoute = require("./routes/user");
const listingRoute = require("./routes/listing");
const bookingRoute = require("./routes/booking");
const User = require("./models/user");
require("./db/mongoose");

const app = express();
app.use(cors());
app.use(express.json());
app.use(userRoute);
app.use(bookingRoute);
app.use(listingRoute);

// const user1 = new User({
//   email: "email",
//   phone: "phone",
//   firstName: "firstName",
//   lastName: "lastName",
//   birthDate: "birthDate",
//   password: "password",
// });

// // user1.save();
// console.log(user1);

app.listen(3003, () => {
  console.log("Server up on Port 3003");
});
