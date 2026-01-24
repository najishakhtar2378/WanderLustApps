const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const { isLoggedIn } = require("../middileware.js");

router.get("/:id", isLoggedIn, async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate("listing");
  res.render("payments/dummy", { booking });
});

router.post("/:id/success", isLoggedIn, async (req, res) => {
  await Booking.findByIdAndUpdate(req.params.id, {
    paymentStatus: "paid",
    bookingStatus: "confirmed"
  });

  req.flash("success", "Payment Successful 🎉 Booking Confirmed!");
  res.redirect("/bookings/my");
});

router.post("/:id/fail", isLoggedIn, async (req, res) => {
  await Booking.findByIdAndUpdate(req.params.id, {
    paymentStatus: "failed"
  });

  req.flash("error", "Payment Failed ❌ Try Again");
  res.redirect("/bookings/my");
});

module.exports = router;
