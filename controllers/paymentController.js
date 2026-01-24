const Booking = require("../models/booking");
const Notification = require("../models/notification");
const { sendBookingEmail } = require("../utils/sendEmail");

module.exports.paymentSuccess = async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate("listing")
    .populate("user");

  if (!booking) {
    req.flash("error", "Booking not found");
    return res.redirect("/bookings/my");
  }

  // ✅ Update booking
  booking.paymentStatus = "paid";
  booking.bookingStatus = "confirmed";
  await booking.save();

  // 🔔 NOTIFICATION (NOW IT WILL WORK)
  await Notification.create({
    user: booking.user._id,
    message: "🎉 Your booking has been confirmed!",
    link: "/bookings/my"
  });

  // 📧 EMAIL
  await sendBookingEmail({
    to: booking.user.email,
    listing: booking.listing,
    checkIn: booking.checkIn,
    checkOut: booking.checkOut
  });

  req.flash("success", "Payment successful! Booking confirmed 🎉");
  res.redirect("/bookings/my");
};