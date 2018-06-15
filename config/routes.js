var express = require("express");
var router = express.Router();

// Timelog functions for route requests
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

// Index Route
router.get("/", function(req, res) {
  res.render("home");
});

module.exports = router;
