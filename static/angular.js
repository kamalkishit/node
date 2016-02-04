var app = angular.module('MyApp', []);

app.config(function($locationProvider) {
	$locationProvider.html5Mode({
		enabled: true,
  		requireBase: false
	});

	$locationProvider.hashPrefix('!');
});

app.controller('mainController', function($scope, $http) {
	$http.get('http://humannize.com:8080/humanize-1/api/content/')
		.success(function(data, status, headers, config) {
			$scope.posts = data.contents;
		})

		.error(function(data, status, headers, config) {
		});
});

app.controller('contentController', function($scope, $http, $location, OGTags) {

	$scope.OGTags = OGTags;

	var string = window.location.href;
	var array = string.split('/');

	var url = "http://humannize.com:8080/humanize-1/api/content?urlId=" + array[array.length-1];

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

			OGTags.setTitle($scope.posts[0].title);
			OGTags.setDescription($scope.posts[0].description);
			OGTags.setImageUrl("http://humannize.com:8080/humanize-1/images/" + $scope.posts[0].imageId);
			OGTags.setUrl($scope.posts[0].url);
			//$scope.htmlReady();
		})

		.error(function(data, status, headers, config) {
		});
});

app.factory('OGTags', function() {
	var title = 'default';
	var description = 'description';
	var imageUrl = 'imageUrl';
	var site_name = 'Humanize';
	var url = 'url';

	return {
		getTitle: function() { return title; },
		setTitle: function(newTitle) { title = newTitle; },
		getDescription: function() { return description; },
		setDescription: function(newDescription) { description = newDescription; },
		getImageUrl: function() { return imageUrl; },
		setImageUrl: function(newImageUrl) { imageUrl = newImageUrl; },
		getSiteName: function() { return site_name; },
		setSiteName: function(newSiteName) { site_name = newSiteName; },
		getUrl: function() { return url; },
		setUrl: function(newUrl) { url = newUrl; }
	};
});