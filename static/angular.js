var app = angular.module('MyApp', []);

app.controller('mainController', function($scope, $http) {
	$http.get('http://humannize.com:8080/humanize-1/api/content/')
		.success(function(data, status, headers, config) {
			$scope.posts = data.contents;
			console.log($scope.posts[0]);
		})

		.error(function(data, status, headers, config) {
			console.log("failure");
		});
});

app.controller('contentController', function($scope, $http, $location) {
	console.log(window.location.href);
	var string = window.location.href;
	var array = string.split('/');
	console.log(array[array.length-1]);
	var data = {
		"contentId": "Two-Sons-Of-A-Daily-Wage-Earner-Crack-IIT-Entrance-Under-500-Rank-1453010155307"
	}

	var baseUrl = "http://humannize.com:8080/humanize-1/content?urlId="
	var url = "http://humannize.com:8080/humanize-1/content?urlId=" + array[array.length-1];



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
			console.log("failure");
		});
 	/*$http.post('http://localhost:8080/content/', data)
            .success(function (data, status, headers, config) {
            	$scope.posts = data.contents;
			console.log($scope.posts[0]);
            })
            .error(function (data, status, header, config) {
            });*/
});