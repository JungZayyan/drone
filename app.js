var coffeeScript = require('coffee-script');
var express = require('express'),
    routes = require('./routes'),
    api = require('./routes/api'),
    http = require('http'),
    path = require('path'),
    arDrone = require('ar-drone'),
    utils = require('./utils'),
    io = require('socket.io'),
    log = new utils.Log('drone');

log.verbose(true);
log.info('starting application...');

var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.enable('case sensitive routing');
    app.enable('strict routing');
    app.use(express.favicon());
    app.configure('development', function(){
      app.use(express.logger('dev'));
    });
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    app.locals.pretty = true;
});

routes(app);

log.info('creating AR.drone client...');
var arClient  = arDrone.createClient();
api(app, arClient, log);

server = http.createServer(app).listen(app.get('port'), function(){
    log.info("express server listening on port %d in mode %s.",
                app.get('port'), app.settings.env);
});

io = io.listen(server);

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

