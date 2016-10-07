/**
 * app.js - Main NodeJS Express Application Controller
 */

// Module dependencies.
var express = require('express'),
    pug = require('pug'),
    path = require('path'),
    home = require('./routes/home');

var app = express();

// Setup the application's environment.
app.set('port',  process.env._EJS_APP_PORT || 3000);
app.set('host',  process.env.EJS_APP_HOST || 'localhost');
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

// Route all GET requests to our public static index.html page
app.get('/', home.index);

// Start listening for requests
var server = app.listen(app.get('port'), app.get('host'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  }
);

var count = require('./count.js');
//var file = __dirname + '/data/dream.txt';
var file = './data/dream.txt';
count.start(file, function(results){
    console.log("results: ",results);
});

// stop spark  when we stop the node program
process.on('SIGTERM', function () {
  count.stop(function() {
    console.log('SIGTERM - stream has been stopped');
    process.exit(0);
  });
});

process.on('SIGINT', function () {
  count.stop(function() {
    console.log('SIGINT - stream has been stopped');
    process.exit(0);
  });
});

