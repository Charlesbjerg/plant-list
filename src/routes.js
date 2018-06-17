var express = require('express');
var r = express.Router();
var db = require('./db');

// Index Route  
r.get('/', function(req, res) {
  db.findAll();
  res.render('home');
});

// Search routes
r.get('/search', function(req, res) {
  let result = db.findAll();
  console.log("Result: " + result);
  res.render('home');
});
r.get('/search/:plant', function (req, res) {
  // Get params
  let plant = req.params.plant;
  let result = db.findMany({ "name": plant });
  console.log("Route result: " + result);
  // Send params in query to db
  // put returned data into object
  // or send error
  // send data to template
  res.render('home', {
    data: result
  });
});

// View all route
r.get('/all', function(req, res) {
  // Search db for all plants
  // Send data to template
  res.render('all');
 });

// Plant routes
r.get('/plant/:plant', function(req, res) {
  // Get params
  // Send query to db 
  // Return data to template
  res.render('plant');
});

// Edit plant routes
r.get('/plant/:plant', function(req, res) {

});
r.post('/plant/:plant', function(req, res) {

});

// Create plant routes
r.get('/plant/create', function(req, res) {

});
r.post('/plant/create', function (req, res) {

});


module.exports = r;
