var config = require('./conf/config'),
    express = require('express'),
    http = require('http'),
    app = express(),
    server = http.createServer(app),
    io = require('socket.io').listen(server),
    winston = require('winston'),
	mongo = require('mongodb').MongoClient;
    expressWinston = require('express-winston');

app.use(express.static(__dirname + "/public"));
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    })
  ]
}));
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.locals.pretty = true;

//======= Init Mongo =======
var routes = require('./routes');
routes.configure({mongo: mongo, http: http});


//======= HTTP SERVER =====
server.listen(3000, function () {
  console.log('Listening at %s', server.address().port);
});

//======= ENDPOINTS ========
app.get('/', function (req, res) {
  res.render('index');
});

app.get('/healthcheck', function (req, res, next) {
    res.send("Healthcheck passed");
});

// List of users from mongo
app.get('/v1/users/list', routes.users.list);

// E3S testing
app.get('/v1/users/project', routes.users.project);



function dummyUsers() {
  io.emit('usersUpdated', [
    {name: "test" + parseInt(Math.random() * 100)},
    {name: "test" + parseInt(Math.random() * 100)},
    {name: "test" + parseInt(Math.random() * 100)},
    {name: "test" + parseInt(Math.random() * 100)}
  ]);
  setTimeout(function () { dummyUsers() }, 100);
}
dummyUsers();




