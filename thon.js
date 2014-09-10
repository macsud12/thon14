var restify = require('restify');
var config = require('./conf/config');

var log = config.logger;
var mongo = require('./dao/mongo');
mongo.connect(config.conf.get('mongo:url'));

var routes = require('./routes');
routes.configure({mongo: mongo});


//======= HTTP SERVER =====
var server = restify.createServer({ name: 'thon', log: log});

server.listen(3000, function () {
  console.log('%s listening at %s', server.name, server.url)
});

server
  .use(restify.fullResponse())
  .use(restify.bodyParser());

server.pre(function (request, response, next) {
    request.log.info({ req: request }, 'REQUEST');
    next();
});


//======= ENDPOINTS ========
server.get('/healthcheck', function (req, res, next) {

    res.send("Healthcheck passed")

});
server.get('/v1/users/list', routes.users.list);




