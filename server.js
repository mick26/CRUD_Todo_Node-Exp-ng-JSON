/*=========================================================
Michael Cullen
Todo CRUD - Express / Angular / JSON File
server.js

2014
Working - (Tá se ag obair)
============================================================*/


/* ========================================================== 
External Modules/Packages Required
============================================================ */
var express  = require('express');						//Express
var logger   = require('morgan');						//logger middleware
var colours = require('colors');
var bodyParser = require('body-parser');				//middleware to read Http packet content using req.body etc
var http = require('http');

/* ========================================================== 
Internal App Modules/Packages Required
============================================================ */
var routes = require('./server/routes.js');				//Exchange routes & mongoose interaction with DB


/* ========================================================== 
Create a new application with Express
============================================================ */
var app = express(); 		

/* ========================================================== 
Set the Port
============================================================ */
app.set('port', process.env.PORT || 3080);

/* ========================================================== 
serve the static index.html from the public folder
============================================================ */
app.use(express.static(__dirname + '/public')); 

/* ========================================================== 
Use Middleware
============================================================ */
app.use(logger('dev')); 	//log every request in dev mode to the console
app.use(bodyParser.json()); //Get info from $HTTP POST/PUT packets - needed for req.body


/* ========================================================== 
ROUTES - using Express
============================================================ */
routes(app);


/* ========================================================== 
Create HTTP Server using Express
============================================================ */
var server = http.createServer(app);

/* ========================================================== 
Bind to a port and listen for connections on it 
============================================================ */
server.listen(app.get('port'), function() {
  console.log('Express HTTP server listening on port ' .red + app.get('port')  ) ;
});

