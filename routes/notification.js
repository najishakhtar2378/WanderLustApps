const express = require("express");
const router = express.Router();
const Notification = require("../models/notification");
const { isLoggedIn } = require("../middileware");

router.get("/notifications", isLoggedIn, async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id })
    .sort({ createdAt: -1 });

  res.render("notifications/index", { notifications });
});
router.delete("/notifications/:id", async (req, res) => {
  await Notification.findByIdAndDelete(req.params.id);
  res.redirect("/notifications");
});

module.exports = router;
