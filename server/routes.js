/*================================================================
Ref.
http://www.youtube.com/watch?v=T-luUYq_obQ
=================================================================*/
/* ============================================================= 
External Modules/Packages Required
===============================================================*/
var fs = require('fs-extra');		//File System
var path = require('path');
var _ = require('underscore');		//Utility Functions working with data

/* ============================================================= 
JSON File
===============================================================*/
var DATA_FILE = './server/assets/todos.json';


/* ============================================================= 
Read and Store the JSON file (in DATA)
===============================================================*/
var DATA = fs.readJsonSync(DATA_FILE);     //happens at server startup


/*================================================================
Methods
=================================================================*/
function getLastId () {
	return DATA.length;
}

function formatRespData (code, content) {
	if (typeof code === 'object') {
    	content = code,
    	code = 1 //0 failure, 1 = success
  	}

	return {
    	code: code,
    	content: content
  	}
}

//writes DATA object to json file(DATA_FILE)
//https://www.npmjs.org/package/fs-extra
function saveDB (callback) {
	fs.writeJson(DATA_FILE, DATA, callback)
}
/*****************************************************************/


module.exports = function(app) 
{
	console.log("DATA -> " + JSON.stringify(DATA));	//TEST

	/*================================================================
	CREATE - $http post
	=================================================================*/
	// create a todo, information comes from AJAX request from Angular
	app.post('/api/todos', function(req, res) 
	{
		//the ID of the last item in the JSON object + 1
		var new_id = DATA[DATA.length-1].id +1;
		
		var reqData = req.body;		
		new_text = req.body.text;

		//create new Todo in JSON format
		var newTodo = { "id":new_id, "text":req.body.text, "done":false };
		
		//push the new Todo to DATA
		//Note: does not save to the file yet 	
		DATA.push(newTodo);

		console.log( "DATA after push-> "+ JSON.stringify(DATA) );	//TEST

		//respond with new DATA JSON object
		res.json(DATA);

		//Save to Json file
		saveDB(function(err) {
			if (err) 
			  res.json(formatRespData(0, err))
			else
			  res.json(formatRespData({id: newTodo.id}))
			}
		)
  	});


	/*================================================================
	READ - $http get
	=================================================================*/
	app.get('/api/todos', function(req, res) 
	{
		console.log(JSON.stringify(DATA));	//TEST
		res.json(DATA);						//respond with DATA JSON object
	});


	/*================================================================
	UPDATE - $http put - WORKING WITH JSON
	=================================================================*/
	app.put('/api/todos/:todo_id', function(req, res) 
	{

		/*================================================================
		_.find(list, predicate, [context]) Alias: detect 
		************************************************
		Looks through each value in the list, returning the first one that 
		passes a truth test (predicate), or undefined if no value passes 
		the test. The function returns as soon as it finds an acceptable 
		element, and doesn't traverse the entire list. 
		var even = _.find([1, 2, 3, 4, 5, 6], function(num){ 
			return num % 2 == 0; 
			}
		);
		https://github.com/lodash/lodash/issues/15
		_([1,2,3,4]).find(function(i) { return i === 5 }); 
		// returns undefined as 5 not in array.
		=================================================================*/
		/*================================================================
	 	_.extend(destination, *sources)
	 	*******************************
	 	Copy all of the properties in the source objects over to the destination object, 
		and return the destination object. It's in-order, so the last source will 
		override properties of the same name in previous arguments.

		_.extend({name: 'moe'}, {age: 50});
		=> {name: 'moe', age: 50}
		=================================================================*/

	 	/*================================================================
	 	http://stackoverflow.com/questions/5971645/what-is-the-double-tilde-
	 	operator-in-javascript
		double tilde ~~ is a double NOT bitwise operator.
	 	It is used as a faster substitute for Math.floor().
	 	Returns a number
		=================================================================*/
		
		id = ~~req.params.todo_id;		//get errors without ~~, ensures value is a number.

		//find the todo in JSON object by giving its id
		var todo_to_Update = _(DATA).find(function(val) { 
			return val.id === id 
		})

		//This is the todo that has to be updated
		console.log("todo_to_Update" + JSON.stringify(todo_to_Update)); //TEST
		
		//e.g. JSON.stringify(req.body) = {"text":"todoText","done":false}
		
		//This is the updated Todo 'text' and 'done' values from client
		var updatedTodoData = req.body;

		/*
		Copy all of the properties in updatedTodoData to todo_to_Update 
		and returns todo_to_Update 
		*/
		var updatedTodoData = _(todo_to_Update).extend(updatedTodoData); 

		//save to json file
		saveDB(function(err) {  	
	    	if (err) 
	      		res.json(formatRespData(0, err))
	    	else
	      		res.json(formatRespData({}))
	  		})

			//Respond with the JSON data (where changes are updated)
  			res.json(DATA);
	});


	/*================================================================
		DELETE - $http delete
	=================================================================*/
	app.delete('/api/todos/:todo_id', function(req, res) 
	{

		id = ~~req.params.todo_id;		//get errors without ~~. Ensures value is a number.
		console.log("ID -> "+id); 		//TEST

		//Get the todo to delete from its id value
		var todo_to_del = _(DATA).find(function(value) {
			return value.id === id;
		});

		//index of the Todo to Delete in JSON object
		//may not be the same as id value
		var idx = DATA.indexOf(todo_to_del);

		//invalid index
		if (idx < 0) 
			return res.json(formatRespData(0, "Could not find Todo with id: " + id))

		//delete 1 item starting at position idx
		DATA.splice(idx, 1);

		//Save to JSON file
		saveDB(function(err) {
			if (err) 
		  		res.json(formatRespData(0, err))
			else
		  	res.json(formatRespData({}))
		})

		//Respond with the JSON data (where changes are updated)
  		res.json(DATA);
	});
};

