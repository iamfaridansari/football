const express = require("express");
const router = express.Router();

const Player = require("../Model/schema");

router.get("/", (req, res) => {
  res.send("Hello world");
});

// add player
router.post("/addplayer", async (req, res) => {
  const { name, availability } = req.body;
  if (!name || !availability) {
    return res.status(422).json({ message: "Enter complete details" });
  }
  //
  try {
    const exists = await Player.findOne({ name: name });
    if (exists) {
      return res.status(422).json({ message: "Player already added" });
    }
    const newPlayer = new Player({ name, availability });
    await newPlayer.save();
    res.status(200).json({ message: "Player added" });
  } catch (error) {
    console.log(error);
  }
});

// fetch players
router.get("/fetchplayers", async (req, res) => {
  try {
    const players = await Player.find();
    res.status(200).json(players);
  } catch (error) {
    console.log(error);
  }
});

// delete player
router.post("/deleteplayer", async (req, res) => {
  const id = req.body.id;
  try {
    await Player.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "Player deleted" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
