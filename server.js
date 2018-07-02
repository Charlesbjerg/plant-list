// Get dependencies
var express = require('express');
var handlebars = require('express-handlebars');
var routes = require('./src/routes.js');
var bodyparser = require('body-parser'); 
var fileUpload = require('express-fileupload');

// Set globals
global.__basedir = __dirname;
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
                html = "<td class='amber'><i class='fas fa-info-circle fa-fw'></i> Low Stock</td>";
            } else {
                // Low stock level
                html = "<td class='red'><i class='fas fa-times-circle fa-fw'></i> No Stock</td>";
            }
            // Return html 
            // return handlebars.escapeExpression(html);
            return html;
        },
        'nav': function(page) {
           // init html string
            let html = "";
            if (page == 'search') {
                html = '<li><a href="/search" class="active"><i class="fas fa-search fa-2x fa-fw"></i> <span>Search</span></a></li><li><a href="/"><i class="fab fa-pagelines fa-2x fa-fw"></i> <span>Home</span></a></li><li><a href="/all"><i class="fas fa-th fa-2x fa-fw"></i> <span>View All</span></a></li>';
            } else if (page == 'home') {
                html = '<li><a href="/search"><i class="fas fa-search fa-2x fa-fw"></i> <span>Search</span></a></li><li><a href="/" class="active"><i class="fab fa-pagelines fa-2x fa-fw"></i> <span>Home</span></a></li><li><a href="/all"><i class="fas fa-th fa-2x fa-fw"></i> <span>View All</span></a></li>';
            } else if (page == 'all') {
                html = '<li><a href="/search"><i class="fas fa-search fa-2x fa-fw"></i> <span>Search</span></a></li><li><a href="/"><i class="fab fa-pagelines fa-2x fa-fw"></i> <span>Home</span></a></li><li><a href="/all" class="active"><i class="fas fa-th fa-2x fa-fw"></i> <span>View All</span></a></li>';
            } else if (page == null) {
                html = '<li><a href="/search"><i class="fas fa-search fa-2x fa-fw"></i> <span>Search</span></a></li><li><a href="/"><i class="fab fa-pagelines fa-2x fa-fw"></i> <span>Home</span></a></li><li><a href="/all"><i class="fas fa-th fa-2x fa-fw"></i> <span>View All</span></a></li>';
            }
            return html;
        }
    }
});

// setup middleware
app.engine('handlebars', hbsConfig.engine);
app.set('view engine', 'handlebars');
// app.enable('view cache');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(fileUpload());

// Serve static files and setup routes
app.use(express.static('public'));
app.use(routes);

// Start app
app.listen(port, function() {
    console.log('Server started on port 3000');
});