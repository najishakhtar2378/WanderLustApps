const express = require("express");
const router = express.Router();
const Report = require("../models/report");

// SHOW REPORT PAGE
router.get("/report", (req, res) => {
  res.render("pages/report");
});

// SUBMIT REPORT
router.post("/report", async (req, res) => {
  try {
    const { email, concernType, description } = req.body;
        console.log(req.body);
    const newReport = new Report({
      email,
      concernType,
      description,
    });

    await newReport.save();

    // flash optional
    req.flash("success", "Report submitted successfully");

    res.redirect("/report-success");
  } catch (err) {
    console.error(err);
    res.redirect("/report");
  }
});

module.exports = router;
