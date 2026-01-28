const express = require("express");
const router = express.Router();
const isAdmin = require("../middileware");

router.get("/founder",isAdmin, (req, res) => {
  res.render("static/founder");
});

module.exports = router;
