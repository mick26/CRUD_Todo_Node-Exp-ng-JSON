## Synopsis
 
A CRUD App using the Angular $HTTP service with verbs post, get, put and delete

- Built with NodeJS, ExpressJS, AngularJS and using a JSON file on the server for storage.

This is a continuation of the CRUD-Todo examples I have put together. This time instead of interacting with a Database the RESTful API performes CRUD operations on the contents of a JSON file located on the server. I have not seen many examples of doing this. The interaction with the JSON file is based on a very good tutorial by [JP Richardson](http://www.youtube.com/watch?v=T-luUYq_obQ)


Node/Express provides the RESTful API that connects to the JSON file.

Angular accesses the RESTful API via $http service (AJAX calls)


The basic Todo App is based on a Node Todo Tutorial on [scotch.io](http://scotch.io/tutorials/javascript/creating-a-single-page-todo-app-with-node-and-angular).



# Requirements

* Node


## Installation

* Clone the Repository
* npm install - install all the node packages listed in the package.json file 
* bower install - installs the front end packages listed in the bower.json file
* node server.js - start up Node\Express server
* Browse to http://localhost:3080


## Motivation
 
On my journey learning Node and AngularJS.
Technologies used: Node, Express 4.2, Angular, REST API, Bower, UnderscoreJS
$http service to make AJAX calls from AngularJS.


Michael Cullen
2014
