var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://webuser:Plants213@ds161610.mlab.com:61610/plant-list";
var collection = "Plants";

// DB functions in module form
module.exports = {
  findOne: function(plant, callback) {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db('plant-list');
      dbo.collection(collection).findOne({ name: plant }, function(err, result) {
        callback(result);
      });
    });
  },  
  findAll: function(callback) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("plant-list");
        dbo.collection(collection).find({}).toArray(function(err, result) {
            if (err) throw err;
            db.close();
            callback(result);
          });
      }
    );
  },
  findMany: function(plant, callback) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("plant-list");
        dbo.collection(collection).find({name: plant}).toArray(function(err, result) {
            if (err) throw err;
            console.log(plant)
            callback(result);
            db.close();
          });
      });
  },
  createOne: function(plantObj, callback) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("plant-list");
        dbo.collection("Plants").insertOne(plantObj, function(err, res) {
          if (err) throw err;
          callback();
        });
      }
    );
  },
  updateOne: function() {},
  searchPlant: function(name, callback) {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db('plant-list');
      dbo.collection(collection).find({ $text:{ $search:name }}).toArray(function(err, result) {
        console.log(result);
        callback(result);
      });
    });
  }
};
