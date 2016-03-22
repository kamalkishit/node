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

	$scope.all = true;
	$scope.achievers = false;
	$scope.beautiful = false;
	$scope.changemakers = false;
	$scope.education = false;
	$scope.empowerment = false;
	$scope.environment = false;
	$scope.governance = false;
	$scope.health = false;
	$scope.humanity = false;
	$scope.inspiring = false;
	$scope.lawAndJustice = false;
	$scope.realHeroes = false;
	$scope.scienceAndTech = false;
	$scope.sports = false;		

	$scope.loadMore = function(createdDate) {
		getMoreContent();
	};

	var url = "/api/content/find";

	var contentSearchParams = {
		categories: $scope.categories
	};

	resetSelection = function() {
		$scope.all = false;
		$scope.achievers = false;
		$scope.beautiful = false;
		$scope.changemakers = false;
		$scope.education = false;
		$scope.empowerment = false;
		$scope.environment = false;
		$scope.governance = false;
		$scope.health = false;
		$scope.humanity = false;
		$scope.inspiring = false;
		$scope.lawAndJustice = false;
		$scope.realHeroes = false;
		$scope.scienceAndTech = false;
		$scope.sports = false;	
	}

	$scope.getContentByCategory = function(categories) {

		resetSelection();
		
		if (categories == "Achievers") {
			$scope.categories = ["Achievers"];
			$scope.achievers = true;
		} else if (categories == "Beautiful") {
			$scope.categories = ["Beautiful"];
			$scope.beautiful = true;
		} else if (categories == "Changemakers") {
			$scope.categories = ["Changemakers"];
			$scope.changemakers = true;
		} else if (categories == "Education") {
			$scope.categories = ["Education"];
			$scope.education = true;
		} else if (categories == "Empowerment") {
			$scope.categories = ["Empowerment"];
			$scope.empowerment = true;
		} else if (categories == "Environment") {
			$scope.categories = ["Environment"];
			$scope.environment = true;
		} else if (categories == "Governance") {
			$scope.categories = ["Governance"];
			$scope.governance = true;
		} else if (categories == "Health") {
			$scope.categories = ["Health"];
			$scope.health = true;
		} else if (categories == "Humanity") {
			$scope.categories = ["Humanity"];
			$scope.humanity = true;
		} else if (categories == "Inspiring") {
			$scope.categories = ["Inspiring"];
			$scope.inspiring = true;
		} else if (categories == "Law and Justice") {
			$scope.categories = ["Law and Justice"];
			$scope.lawAndJustice = true;
		} else if (categories == "Real Heroes") {
			$scope.categories = ["Real Heroes"];
			$scope.realHeroes = true;
		} else if (categories == "Science and Tech") {
			$scope.categories = ["Science and Tech"];
			$scope.scienceAndTech = true;
		} else if (categories == "Sports") {
			$scope.categories = ["Sports"];
			$scope.sports = true;
		} else {
			$scope.categories = ["Achievers", "Beautiful", "Changemakers", "Education", "Empowerment", "Environment", 
					"Governance", "Health", "Humanity", "Inspiring", "Law and Justice", "Real Heroes", "Science and Tech", "Sports"];
			$scope.all = true;
		}

		var contentSearchParams = {
			categories: $scope.categories
		}

		get(contentSearchParams);
	}

	getMoreContent = function() {
		var contentSearchParams = {
			categories: $scope.categories,
			createdDate: $scope.createdDate
		}

		getMore(contentSearchParams);
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

			$scope.posts = $scope.posts.concat(contents);
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
