var express = require("express");
var r = express.Router();
var db = require("./db");

// Index Route
r.get("/", function(req, res) {
    res.render("home", { page: 'home' });
});

// Search routes
r.get("/search", function(req, res) {
    res.render("search", {
      results: false,
      page: 'search'
  });
});
r.post("/search", function(req, res) {
  // Get params
  let plant = req.body.search;
  console.log(plant);
  db.findMany(plant.toLowerCase(), function(data) {
    console.log(data);
    res.render("search", { 
      result: data,
      page: 'search'
    });
  });
});

// View all route
r.get("/all", function(req, res) {
  db.findAll(function(data) {
    console.log(data);
    res.render("all", {
      result: data,
      page: 'all'
    });
  });
});

// Plant routes
r.get("/plant/create", function(req, res) {
    res.render('create');
});

r.get("/plant/:plant", function(req, res) {
  // Get params
  let plant = req.params.plant;
  db.findOne(plant.toLowerCase(), function(data) {
    console.log(data);
    res.render("plant", {
       plant: data
      });
  });
});

// // Edit plant routes
r.get("/plant/:plant/edit", function(req, res) {
  res.render('edit');
});
r.post("/plant/:plant", function(req, res) {});

// Create plant routes

module.exports = r;
