/*=========================================================
Michael Cullen
Todo CRUD - Express 4 / Angular / JSON File
server.js

May 2014
Working - (Tá se ag obair)
============================================================*/


/* ========================================================== 
External Modules/Packages Required
============================================================ */
var express  = require('express');						//Express v4.2 Web server
var logger   = require('morgan');						//logger middleware
var bodyParser = require('body-parser');				//middleware to read Http packet content using req.body etc

/* ========================================================== 
Internal App Modules/Packages Required
============================================================ */
var routes = require('./server/routes.js');				//Exchange routes & mongoose interaction with DB


/* ========================================================== 
Port the server will listen on
============================================================ */
var port = process.env.PORT || 3080; 					//set the port

/* ========================================================== 
Create a new application with Express
============================================================ */
var app = express(); 		


/* ========================================================== 
serve the static index.html from the public folder
============================================================ */
app.use(express.static(__dirname + '/public')); 

/* ========================================================== 
Use Middleware
============================================================ */
app.use(logger('dev')); 	//log every request to the console
app.use(bodyParser()); 		//Get info from $HTTP POST/PUT packets - needed for req.body


/* ========================================================== 
ROUTES - using Express
============================================================ */
routes(app);


/* ========================================================== 
Bind to a port and listen for connections on it 
============================================================ */
var server = app.listen(port, function() {
	console.log('Listening on port %d', server.address().port);
	console.log("========LISTENING=========")
});


