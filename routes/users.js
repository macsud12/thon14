var mongo = undefined;

exports.configure = function (params) {
    mongo = params.mongo;
};

exports.list =function (req, res, next) {
    console.log('List of users');
	
	// Connect to the db
	mongo.connect("mongodb://localhost/thon", function(err, db) {
	  if(!err) {
		console.log("We are connected");
		var collection = db.collection('thon');
		collection.find().toArray(function(err, items) {console.log(items);res.send(items);});
	  }
	});
};
