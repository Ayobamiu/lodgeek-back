const Listing = require("../models/listing");

const listingsQuery = async (req, res) => {
  const sort = {};
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split("_");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }
  const searchEntry = req.query.search ? req.query.search : "";
  const searchQuery = new RegExp(".*" + searchEntry + ".*", "i");
  const typeEntry = req.query.type ? req.query.type : "";
  const typeQuery = new RegExp(".*" + typeEntry + ".*", "i");
  try {
    const listings = await Listing.find({
      title: searchQuery,
      price: {
        $gte: req.query.minPrice ? req.query.minPrice : 0,
        $lte: req.query.maxPrice ? req.query.maxPrice : 10000000,
      },
      type: typeQuery,
    })
      .limit(Number(req.query.limit))
      .sort(sort);
    res.send(listings);
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = { listingsQuery };
