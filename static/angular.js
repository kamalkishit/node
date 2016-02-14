var app = angular.module('MyApp', []);

app.controller('mainController', function($scope, $http) {
	$http.get('http://humannize.com:8080/humanize-1/api/content/')
		.success(function(data, status, headers, config) {
			$scope.posts = data.contents;
		})

		.error(function(data, status, headers, config) {
		});
});

app.controller('contentController', function($scope, $http, $location) {

	var string = window.location.href;
	var array = string.split('/');

	//var url = "http://humannize.com:8080/humanize-1/api/content?urlId=" + array[array.length-1];
	var url = "/api/content?urlId=" + array[array.length-1];

	$http.get(url)
		.success(function(data, status, headers, config) {
			$scope.posts = data.contents;
			var theDate = new Date($scope.posts[0].createdDate);
			var monthNames = [
  					"Jan", "Feb", "Mar",
					"Apr", "May", "Jun", "Jul",
					"Aug", "Sep", "Oct",
					"Nov", "Dec"
				];

			$scope.date = monthNames[theDate.getMonth()] + ' ' + theDate.getDate() + ' ' +  theDate.getFullYear();

		})

		.error(function(data, status, headers, config) {
		});
});

app.controller('trendsController', function($scope, $http) {

	var url = "/api/content/trends";

	$http.get(url)
		.success(function(data, status, headers, config) {
			$scope.trends = data.contents;
		})

		.error(function(data, status, headers, config) {
		});
});

app.controller('homeController', function($scope, $http, $location) {

	var url = "/api/content/find";

	var contentSearchParams = {
		categories: ["Achievers", "Beautiful", "Humanity", "Real Heroes", "Education"]
	};

	$http({
  		method: 'POST',
  		url: url,
  		data: contentSearchParams,
        headers: {
            'Content-Type': 'application/json'
		}})
		.then(function successCallback(data, status, headers, config) {
			var contents = data.data.contents;

			for (var i = 0; i < contents.length; i++) {
				var theDate = new Date(contents[i].createdDate);
				var monthNames = [
	  					"Jan", "Feb", "Mar",
						"Apr", "May", "Jun", "Jul",
						"Aug", "Sep", "Oct",
						"Nov", "Dec"
					];

				contents[i].createdDate = monthNames[theDate.getMonth()] + ' ' + theDate.getDate() + ' ' +  theDate.getFullYear();
			}


			$scope.posts = contents;
 	 	}, function errorCallback(response) {
 	 		console.log('error');
  		});

});
