const express = require("express");
const router = express.Router();
const { downloadInvoice } = require("../controllers/invoiceController");

router.get("/invoice/:id", downloadInvoice);

module.exports = router;