const express = require("express");
const router = express.Router();

router.get("/about", (req, res) => {
  res.render("pages/about");
});
router.get("/privacy", (req, res) => {
  res.render("pages/privacy");
});
router.get("/terms", (req, res) => {
  res.render("pages/terms");
});
router.get("/careers", (req, res) => {
  res.render("pages/careers");
});
router.get("/help", (req, res) => {
  res.render("pages/help");
});
module.exports = router;
