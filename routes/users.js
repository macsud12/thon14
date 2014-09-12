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

exports.project =function (req, res, next) {
    console.log('Project info');
	
	http.get("https://e3s.epam.com/rest/e3s-eco-scripting-impl/0.1.0/data/select?type=com.epam.e3s.app.project.api.data.ProjectProjectionEntity&query={'name':'NYT-ODC'}", 
		function (resp) {
			res.send(resp)
		});
};
