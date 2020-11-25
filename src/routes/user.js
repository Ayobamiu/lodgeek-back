const express = require("express");
const { getValidationErrors } = require("../logic/errors");
const User = require("../models/user");
const auth = require("../middlewares/auth");
const { allowedUpdateForUser } = require("../logic/user");
const upload = require("../bucket-config/bucket");

const router = express.Router();

router.post("/users", async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser)
    return res
      .status(400)
      .send({ error: "Account with this email already exist" });

  try {
    const user = new User(req.body);
    const token = await user.generateAuthToken();
    await user.save();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/users", async (req, res) => {
  const users = await User.find({});
  try {
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  if (!allowedUpdateForUser(updates)) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const user = await User.findById(req.params.id);
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(400).send();
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ error: "Unable to login" });
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    //remove user currently used token from user's token list
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    //remove all users tokens from user's token list
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

//upload user image
router.post(
  "/users/me/image",
  auth,
  upload.single("image"),
  async (req, res) => {
    req.user.image = req.file.path;
    try {
      await req.user.save();
      res.send(req.user);
    } catch (error) {
      res.status(400).send();
    }
  }
);

//update user image
router.patch(
  "/users/me/image",
  auth,
  upload.single("image"),
  async (req, res) => {
    req.user.image = req.file.path;
    try {
      await req.user.save();
      res.send(req.user);
    } catch (error) {
      res.status(400).send();
    }
  }
);

//delete user image
router.delete("/users/me/image", auth, async (req, res) => {
  req.user.image = undefined;
  try {
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(400).send();
  }
});

//delete user
router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
