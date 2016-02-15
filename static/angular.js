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

	$scope.categories = ["Achievers", "Beautiful", "Changemakers", "Education", "Empowerment", "Environment", 
			"Governance", "Health", "Humanity", "Inspiring", "Law and Justice", "Real Heroes", "Science and Tech", "Sports"];

	$scope.loadMore = function(createdDate) {
		getMoreContent(createdDate, $scope.categories);
	};

	var url = "/api/content/find";

	var contentSearchParams = {
		categories: $scope.categories
	};

	$scope.getContentByCategory = function(categories) {
		var contentSearchParams = {
			categories: categories
		}

		get(contentSearchParams);
	}

	getMoreContent = function(createdDate, categories) {
		var contentSearchParams = {
			categories: categories,
			createdDate: createdDate
		}

		get(contentSearchParams);
	}

	getContent = function(contentSearchParams) {
		get(contentSearchParams);
	}

	getMore = function(contentSearchParams) {
		$http({
  		method: 'POST',
  		url: url,
  		data: contentSearchParams,
        headers: {
            'Content-Type': 'application/json'
		}})
		.then(function successCallback(data, status, headers, config) {
			var contents = data.data.contents;

			$scope.createdDate = contents[contents.length-1].createdDate;

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
  		});
	}

	get = function(contentSearchParams) {
		$http({
  		method: 'POST',
  		url: url,
  		data: contentSearchParams,
        headers: {
            'Content-Type': 'application/json'
		}})
		.then(function successCallback(data, status, headers, config) {
			var contents = data.data.contents;

			$scope.createdDate = contents[contents.length-1].createdDate;

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
  		});
	}

	getContent(contentSearchParams);
});
