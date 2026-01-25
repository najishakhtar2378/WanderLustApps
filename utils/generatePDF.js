const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

module.exports = function generatePDF(data) {
  const invoiceDir = path.join(__dirname, "../invoices");

  // folder exist na kare to create
  if (!fs.existsSync(invoiceDir)) {
    fs.mkdirSync(invoiceDir);
  }

  const filePath = path.join(
    invoiceDir,
    `invoice-${data._id}.pdf`
  );

  const doc = new PDFDocument({ margin: 50 });

  doc.pipe(fs.createWriteStream(filePath));

  // ----- CONTENT -----
  doc
    .fontSize(22)
    .text("Airbnb Clone - Invoice", { align: "center" });

  doc.moveDown();

  doc.fontSize(12);
  doc.text(`Invoice ID: ${data._id}`);
  doc.text(`Date: ${new Date().toDateString()}`);

  doc.moveDown();

  doc.text(`Listing: ${data.listing.title}`);
  doc.text(`Guest: ${data.user.username}`);
  doc.text(`Check-in: ${data.checkIn.toDateString()}`);
  doc.text(`Check-out: ${data.checkOut.toDateString()}`);

  doc.moveDown();

  doc
    .fontSize(14)
    .text(`Total Amount: ₹ ${data.totalPrice}`, {
      underline: true
    });

  doc.text(`Payment Status: ${data.paymentStatus}`);

  doc.end();

  return filePath;
};
