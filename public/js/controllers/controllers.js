/**
 * Module - for the Controllers
 */

angular.module('mongoDbApp.controllers', [])

/**
 * Controller - MainCtrl
 */
.controller('MainCtrl', function($scope, $http) {

	$scope.formData = {};

	/*================================================================
		READ - $http get
	=================================================================*/
	// when landing on the page, get all todos and show them
	$http.get('/api/todos')

		//success - callback fn
		.success(function(data, status, headers, config) {
			$scope.todos = data;

			//TEST
			// console.log("data-> " + JSON.stringify(data) );
			console.info("Status: " + status);
			console.info("Config: " + JSON.stringify(config));
		})

		//error - callback fn
		.error(function(data, status, headers, config) {
			console.log('Error: ' + data);
		});


	/*================================================================
		CREATE - $http post
	=================================================================*/
	$scope.createTodo = function() 
	{
	
		console.info("CreateTodo formData: " + JSON.stringify($scope.formData));//TEST

		//send the "text" value to the server "done"=false for a new Todo 
		$http.post('/api/todos', $scope.formData)

			//success
			.success(function(data, status, headers, config) {
		
				$scope.todos = data;
				console.info("Status: " + status);
				console.info("Config: " + JSON.stringify(config));
			})

			//error
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};


	/*================================================================
		UPDATE - $http put
	=================================================================*/
	$scope.editTodo = function (id, txt, isDone) {

		var editData = {"text":txt, "done": isDone};

		$http.put('/api/todos/' + id, editData)

		//success
		.success(function(data, status, headers, config) {
			$scope.todos = data;
			console.info("Put Status: " + status);
			console.info("Config: " + JSON.stringify(config));
		})

		//error
		.error(function(data) {
			console.log('Error Updating: ' + data);
		});
	};


	/*================================================================
		DELETE - $http delete
	=================================================================*/
	$scope.deleteTodo = function(id) 
	{
		$http.delete('/api/todos/' + id)

			//success
			.success(function(data, status, headers, config) {
				$scope.todos = data;
				console.info("Status: " + status);
				console.info("Config: " + JSON.stringify(config));
			})

			//error
			.error(function(data) {
				console.log('Error deleting: ' + data);
			});
	};
})
