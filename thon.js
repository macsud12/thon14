var config = require('./conf/config'),
    express = require('express'),
    http = require('http'),
    https = require('https'),
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


//Init e3s dao
var e3s = require('./dao/e3s');
e3s.config({https:https});

//======= Init Routes =======
var rest = require('./routes/rest');
rest.configure({mongo: mongo, https: https, e3s: e3s});

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
app.get('/v1/users', rest.users);

// E3S testing
app.get('/v1/users/projects', rest.userProjects);



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




