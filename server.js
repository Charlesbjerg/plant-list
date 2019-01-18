// Get dependencies
var express = require('express');
var handlebars = require('express-handlebars');
var routes = require('./src/routes');
var bodyparser = require('body-parser'); 
var fileUpload = require('express-fileupload');
var handlebarsConfig = require('./src/hbsConfig');

// Set globals
global.__basedir = __dirname;

// init app
var app = express();

// Set port
let port = process.env.PORT || 3002;

// Set handlebars config
let hbsConfig = handlebars.create(handlebarsConfig);

// setup middleware
app.engine('handlebars', hbsConfig.engine);
app.set('view engine', 'handlebars');
// app.enable('view cache');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(fileUpload());

// Serve static files and setup routes
app.use(express.static('public'));
app.use(routes);

// 404 and 500 error pages
app.use(function (req, res) {
    res.status(400);
    res.render('404');
});
app.use(function (error, req, res, next) {
    res.status(500);
    res.render('500');
});

// Start app
app.listen(port, function() {
    console.log(`Server started on port ${port}`);
});