const express = require("express");
const router = express.Router();

router.get("/founder", (req, res) => {
  res.render("static/founder");
});

module.exports = router;
