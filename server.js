var express = require('express')
  , http = require('http')
  , path = require('path')
  , livereload = require('connect-livereload')
  , repository = require('./server/repository')
  , SERVER_PORT = 'NODE_SERVER_PORT'
  , LIVERELOAD_PORT = 'NODE_LIVERELOAD_PORT'
  , PUBLIC_DIRECTORY = 'NODE_PUBLIC_DIRECTORY';

if (!process.env[SERVER_PORT]) {
  console.error('Need to set the server port environment variable (run with gulp)');
  process.exit(1);
}
if (!process.env[LIVERELOAD_PORT]) {
  console.error('Need to set the livereload port environment variable (run with gulp)');
  process.exit(1);
}
if (!process.env[PUBLIC_DIRECTORY]) {
  console.error('Need to set the hosting directory environment variable (run with gulp)');
  process.exit(1);
}

var app = express(),
    clientDir = path.join(__dirname, process.env[PUBLIC_DIRECTORY]);

// all environments
app.use(express.favicon(path.join(clientDir + 'favicon.ico')));
app.use(express.logger('dev'));

// load liveReload script only in development mode
app.configure('development', function() {
  console.log('configuring as development server');
  // live reload script (adds js snippet, but doesn't host server)
  app.use(livereload({ port: process.env[LIVERELOAD_PORT] }));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.use(app.router);
app.use(express.static(clientDir));

app.get('/api/games/:id?', repository('games'));
app.get('/api/locations/:id?', repository('locations'));
app.get('/api/pools/:id?', repository('pools'));
app.get('/api/teams/:id?', repository('teams'));
app.get('/api/players/:id?', repository('players'));

var server = http.createServer(app).listen(process.env[SERVER_PORT], function(){
  console.log('Express server listening on port ' + process.env[SERVER_PORT]);
});
