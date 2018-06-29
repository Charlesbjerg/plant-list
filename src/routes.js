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
    if (err) throw err;
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
r.get("/plant/:plant/edit", function(req, res) {
  res.render('edit');
});
r.post("/plant/:plant", function(req, res) {});

// Debug routes
r.get('/debug/:plant', function(req, res) {
  let plant = req.params.plant;
  db.search(plant, function(data) {
    res.render('debug', {
      data: data,
      page: 'home'
    })
  });
});

// Export routes to express app
module.exports = r;