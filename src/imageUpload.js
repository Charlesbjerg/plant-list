let fs = require('fs');
let upload = require('express-fileupload');
module.exports = {
    image: function(files, name) {
        // Retrieve uploaded file
        let file = files.upload;
        // Move file to data folder
        let url = __basedir + '/public/data/plant-images/' + name + '.jpg';
        file.mv(url, function(err) {
            // Error check
            if (err) throw err;
            console.log('file moved');
        });
    }
};