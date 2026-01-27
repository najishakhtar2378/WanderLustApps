const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    concernType: {
      type: String,
      required: true,
      enum: ["Fraud", "Harassment", "Safety Issue", "Other"],
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending", // Pending | Reviewed | Resolved
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
