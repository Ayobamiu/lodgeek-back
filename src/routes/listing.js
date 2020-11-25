const express = require("express");
const { listingsQuery } = require("../logic/listings");
const Listing = require("../models/listing");

const router = express.Router();

router.post("/listings", async (req, res) => {
  try {
    const listing = new Listing(req.body);
    await listing.save();
    res.send(listing);
  } catch (error) {
    res.send(400).send(error);
  }
});

//get listings e.g. /listings?search=product&limit=1&sortBy=createdAt:desc
router.get("/listings", async (req, res) => {
  listingsQuery(req, res);
});

module.exports = router;
