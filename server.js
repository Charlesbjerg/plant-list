// Require any dependencies
var express = require('express');
var handlebars = require('express-handlebars');
var routes = require('./src/routes.js');

// init app
var app = express();

// set templating engine
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
// app.enable('view cache');

// Serve static files and setup routes
app.use(express.static('public'));
app.use(routes);

// Start app
app.listen(3000, function() {
    console.log('Server started on port 3000');
});