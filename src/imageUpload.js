let fs = require('fs');
let upload = require('express-fileupload');
let jimp = require('jimp');

module.exports = {
    image: function(files, name) {
        // Retrieve uploaded file
        let file = files.upload;
        // Move file to data folder
        let url = __basedir + '/public/data/plant-images/' + name + '.jpg';

        // try catch in case no file provided
        try {
            file.mv(url, function(err) {
                // Edit file once moved
                jimp.read(url, function(err, file) {
                    if (err) console.log(err);
                    file.cover(1026, 1026)
                        .quality(75)
                        .write(url);
                });
            });
        }
        catch(err) {
            if (err) console.error(err) ;
        }
    }
};