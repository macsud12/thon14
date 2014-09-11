var config = require('./conf/config');
var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + "/public"));
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.locals.pretty = true;

var mongo = require('./dao/mongo');
//mongo.connect(config.conf.get('mongo:url'));

var routes = require('./routes');
routes.configure({mongo: mongo});


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
app.get('/v1/users/list', routes.users.list);




