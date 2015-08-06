/**
 * Module dependencies.
 */

var express = require('express');
var knex = require("knex")({
	client : "pg",
	connection : {
		database : "plaza-care",
		user : "postgres",
		password : "postgres",
		host : "localhost",
		port : 5432
	}
});
var model = require('./model')(knex);
var routes = require('./routes')(model);
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
// pastas com arquivos estáticos
app.use("/app", express.static(path.join(__dirname, 'app')));
app.use("/lib", express.static(path.join(__dirname, 'bower_components')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
