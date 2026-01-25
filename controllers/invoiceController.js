const Booking = require("../models/booking");
const generatePDF = require("../utils/generatePDF");

module.exports.downloadInvoice = async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate("listing")
    .populate("user");

  if (!booking || booking.paymentStatus !== "paid") {
    return res.status(403).send("Invoice not available");
  }

  const filePath = generatePDF(booking);

  res.download(filePath);
};
