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
  db.searchPlant(plant.toLowerCase(), function(data) {
    res.render("search", { 
      result: data,
      page: 'search'
    });
  });
});

// View all route
r.get("/all", function(req, res) {
  db.findAll(function(data) {
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
r.post("/plant/create", function(req, res) {
  // Process posted data and put into object
  let data = req.body;
  let plant = {
    name: data.name.toLowerCase(),
    variant: data.variant,
    price: data.price,
    deal: data.deal,
    form: data.form,
    stockLevel: data.level,
    location: data.location
  };
  // send object to database
  db.createOne(plant, function(){
    // redirect to new plant
    let url = '/plant/' + plant.name;
    console.log(plant);
    res.redirect(url);
  });
});
r.get("/plant/:plant", function(req, res) {
  // Get params
  let plant = req.params.plant;
  db.findOne(plant.toLowerCase(), function(data) {
    res.render("plant", {
        plant: data
      });
  });
});

// Stock Location Update
r.get("/plant/:plant/location-update", function(req, res) {
  // find document
  db.findOne(req.params.plant, function(data) {
    res.render('locationUpdate', {
      location: data.location,
      name: data.name
    });
  });
});
r.post("/plant/:plant/location-update", function(req, res) {
  // Send to db
  db.updateLocation(req.params.plant, req.body.stockLocation, function() {
    // Redirect to update plant
    let url = '/plant/' + req.params.plant;
      res.redirect(url);
   });
});

// Stock Level Update
r.get("/plant/:plant/stock-update", function(req, res) {
  // find document for stock level
  db.findOne(req.params.plant, function(data) {
    res.render('stockUpdate', {
      stockLevel: data.stockLevel,
      name: data.name
    });
  });
});
r.post("/plant/:plant/stock-update", function(req, res) {
  db.updateStock(req.params.plant, req.body.stockLevel, function() {
    let url = '/plant/' + req.params.plant;
    res.redirect(url);
  });
});

// Export routes to express app
module.exports = r;