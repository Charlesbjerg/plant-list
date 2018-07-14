// include file exist module
let fileExists = require('file-exists');

let config = {
    defaultLayout: 'main',
    helpers: {
        // Helper to output correct html for stock amount
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
        
        // Helper for highlighting the correct button on the navbar
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
        },

        // Helper to check if the plant image exists 
        'urlCheck': function(name) {
            // let url
            let url = __basedir + "/public/data/plant-images/" + name +".jpg";
            let imageName = "";
            // file check
            if (fileExists.sync(url)) { 
                imageName = name;
            } else {
                imageName = "default";
            }
            // return new name
            return imageName;
        }
    }
};
    
module.exports = config;