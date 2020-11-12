const express = require("express");
const userRoute = require("./routes/user");
const User = require("./models/user");
require("./db/mongoose");

const app = express();
app.use(express.json());
app.use(userRoute);

const user1 = new User({
  email: "email",
  phone: "phone",
  firstName: "firstName",
  lastName: "lastName",
  birthDate: "birthDate",
  password: "password",
});

// user1.save();
console.log(user1);

app.listen(3003, () => {
  console.log("Server up on Port 3000");
});
