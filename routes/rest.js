var mongo = undefined;
var https = undefined;
var e3s = undefined;

exports.configure = function (params) {
	mongo = params.mongo;
	https = params.https;
	e3s = params.e3s;
};

// To check mongo DB connection
exports.users =function (req, res, next) {
    console.log('List of users');
	
	// Connect to the db
	mongo.connect("mongodb://localhost/thon", function(err, db) {
	  if(!err) {
		console.log("We are connected");
		var collection = db.collection('thon');
		collection.find().toArray(function(err, items) {
			console.log(items);
			res.send(items)
		;});
	  }
	});
};

// To get project info
exports.userProjects =function (req, res, next) {
	console.log('Project info');
	
	var name = req.query.user;
	if (name === undefined || name === '') {name = 'maksim_alipov@epam.com'};
	var response = e3s.projectList(name.toLowerCase()+'@epam.com', function(data) {
		res.setHeader('content-type', 'text/html');
		res.send(JSON.stringify(data));
});
	
	
};

