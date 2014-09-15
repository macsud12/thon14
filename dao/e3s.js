var https = undefined;

exports.config = function(params) {
	https = params.https;
};

var options = {
  hostname: 'e3s.epam.com',
  port: 443,  
  method: 'GET',
  headers: {'Cookie': 'e3sSessionId=cc408758-67b9-49b7-9ae3-7de85b1141a3;mellon-cookie=1bc7128f782bddf3713e11835170d6e2;ROUTEID=e3s.karaf1'}
};

exports.projectList = function (email, callback) {
    options.path="/rest/e3s-eco-scripting-impl/0.1.0/data/select?" +
	"type=com.epam.e3s.app.people.api.data.EmployeeEntity&query={\"emailsSum\":\"" + email + "\"}}&fields=projectall";

	https.get(options, 
		function (resp) {
		console.log(email);
		resp.on('data', function(d) {
			var parsed = JSON.parse(d);
			console.log(parsed);
			var projects = parsed[0].projectall;
		
			var response = {"projects": projects.split(" ")};			
   			callback(response);
  		});
	});
};
