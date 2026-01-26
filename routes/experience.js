const express = require("express");
const router = express.Router();

// show form
router.get("/experience", (req, res) => {
  res.render("experiences/new");
});

// handle form submit
router.post("/experience", (req, res) => {
  const { title, location, category, description, price } = req.body;

  // console.log(req.body); // later save in DB

  res.render("experiences/success");
});

module.exports = router;
