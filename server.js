// Require any dependencies
var express = require('express');
var handlebars = require('express-handlebars');
var routes = require('./src/routes.js');
var bodyparser = require('body-parser'); 

// init app
var app = express();

// Set port
let port = process.env.PORT || 3000;

// setup middleware
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
// app.enable('view cache');
app.use(bodyparser.urlencoded({ extended: true }));

// Serve static files and setup routes
app.use(express.static('public'));
app.use(routes);

// Start app
app.listen(port, function() {
    console.log('Server started on port 3000');
});