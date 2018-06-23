// Require any dependencies
var express = require('express');
var handlebars = require('express-handlebars');
var routes = require('./src/routes.js');
var bodyparser = require('body-parser'); 

// init app
var app = express();

// Set port
let port = process.env.PORT || 3000;

// Set handlebars config
var hbsConfig = handlebars.create({
    defaultLayout: 'main',
    helpers: {
        'stockLevel': function(plant) {
            // Get stocklevel and init html string
            let stockLevel = plant.stockLevel;
            let html = "";
            // Determine stock level
            if (stockLevel == "3") {
                // High stock level
                html = "<td class='green'><i class='fas fa-check-circle fa-fw'></i> High Stock</td>";
            } else if (stockLevel == "2") {
                // Medium stock level
                html = "<td class='amber'><i class='fas fa-info-circle fa-fw'></i> Medium Stock</td>";
            } else {
                // Low stock level
                html = "<td class='red'><i class='fas fa-times-circle fa-fw'></i> Low Stock</td>";
            }
            // Return html 
            // return handlebars.escapeExpression(html);
            return html;
        }  
    }
});

// setup middleware
app.engine('handlebars', hbsConfig.engine);
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