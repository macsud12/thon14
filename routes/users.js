var mongo = undefined;
var https = undefined;

exports.configure = function (params) {
    mongo = params.mongo;
	https = params.https;
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

var options = {
  hostname: 'e3s.epam.com',
  port: 443,
  path: "/rest/e3s-eco-scripting-impl/0.1.0/data/select?type=com.epam.e3s.app.project.api.data.ProjectProjectionEntity&query={\"name\":\"NYT-ODC\"}",
  method: 'GET',
  headers: {'Cookie': 'e3sSessionId=3623969a-0788-4aba-b481-fc20a33acac6;mellon-cookie=1c156d713a0b421a1aac3f10f6451b24;ROUTEID=e3s.karaf1'}
};

	
	https.get(options, 
		function (resp) {

		resp.on('data', function(d) {
			var parsed = JSON.parse(d);
			var manager = parsed[0].manager;
			var billing = parsed[0].billingtype;
		
			var response = {"billing-type": billing, "managers": manager};			

			res.setHeader('content-type', 'text/html');
   			res.send(JSON.stringify(response));
  		});
	});
};
