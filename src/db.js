var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://webuser:Plants213@ds161610.mlab.com:61610/plant-list';
var collection = 'Plants';

// DB functions in module form
module.exports = {
    findOne: function() {
        
    },
    findAll: function() {
        var data;
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db('plant-list');
            dbo.collection(collection).find({}).toArray(function (err, result) {
                if (err) throw err;
                console.log("collection result: ");
                data = result;
                console.log(data);
                db.close();
            });
        });
        console.log("data");
        console.log(data);
        return data;
    },
    findMany: function(query) {
        let data = []; 
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db('plant-list');
            console.log(query);
            dbo.collection(collection).find({ query }).toArray(function (err, result) {
                if (err) throw err;
                data = result;
                console.log("Collection Return data: " + result);
                db.close();
                // return result;
            });
        });
        console.log("Return data: " + data);
        return data;
    },
    createOne: function() {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db('plant-list');
            var plant = {
                name: 'Geranium',
                variant: 'Red',
                price: '3.15',
                deal: '4 for £10',
                form: 'Potted',
                stockLevel: 3,
                location: 'Canopy Bed - End 3'
            };
            dbo.collection('Plants').insertOne(plant, function (err, res) {
                if (err) throw err;
                console.log('Plant added.');
            });
        });
    },
    updateOne: function() {

    }
};
