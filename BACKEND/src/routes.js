const express = require("express");
const mongoose = require("mongoose");
const { UserModel } = require("./models/user.model");
const { EventModel } = require("./models/event.model");
const router = express.Router();

//register user
router.route("/register").post(async (req, res) => {
  try {
    if (!req.body) {
      throw new Error("Enter Form Data");
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new Error("All Fields are Required");
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error("User Already Exists");
    }

    const user = await UserModel.create({ name, email, password });

    res
      .status(201)
      .send({ message: "User Registered Successfully", token: user._id });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

//login user
router.route("/login").post(async (req, res) => {
  try {
    if (!req.body) {
      throw new Error("Enter Form Data");
    }

    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("All Fields are Required");
    }

    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      throw new Error("User Not Found");
    }

    if (existingUser.password !== password) {
      throw new Error("Invalid Credentials");
    }
    res
      .status(200)
      .send({
        message: "User Logged In Successfully",
        token: existingUser._id,
      });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.use((req, res, next) => {
  try {
    const token = req.headers["user"];
    if (!token) {
      throw new Error("Unauthorised Login");
    }
    if (!mongoose.isValidObjectId(token)) {
      throw new Error("Enter Valid Credentials");
    }
    req.user = token;
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//profile route
router.route("/profile").get(async (req, res) => {
  try {
    const user = await UserModel.findById(req.user).select("-password");
    if (!user) throw new Error("User Not Found");

    return res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.route("/add-event").post(async (req, res) => {
  try {
    const { title, description, location, category, date } = req.body;
    if (!title || !location || !category || !date) {
      throw new Error("Enter all fields");
    }
    const formattedDate = new Date(date).toISOString().split("T")[0];
    await EventModel.create({
      title,
      description,
      location,
      category,
      date: formattedDate,
      user: req.user,
    });
    res.status(200).send({ message: "Event Added!" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.route("/all-events").get(async (req, res) => {
  try {
    const all_events = await EventModel.find({ user: req.user });
    res.status(200).send(all_events);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router
  .route("/event/:id")
  // Get single event
  .get(async (req, res) => {
    try {
      const event = await EventModel.findById(req.params.id);
      if (!event) {
        return res.status(404).send({ error: "Event not found" });
      }
      res.status(200).send(event);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  })

  // Update event
  .put(async (req, res) => {
    try {
      const id = req.params.id;
      const { title, description, location, category, date } = req.body;

      if (!title || !location || !category || !date) {
        throw new Error("Enter all fields");
      }

      const formattedDate = new Date(date).toISOString().split("T")[0];

      const updatedEvent = await EventModel.findByIdAndUpdate(
        id,
        { title, description, location, category, date: formattedDate },
        { new: true } // return updated doc
      );

      if (!updatedEvent) {
        return res.status(404).send({ error: "Event not found" });
      }

      return res.status(200).send({ message: "Event Updated", updatedEvent });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  })

  // Delete event
  .delete(async (req, res) => {
    try {
      const event = await EventModel.findByIdAndDelete(req.params.id);
      if (!event) {
        return res.status(404).send({ error: "Event not found" });
      }
      return res.status(200).send({ message: "Event Deleted" });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });

module.exports = router;
