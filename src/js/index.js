var myApp = angular.module('myApp', [])

.controller('dataCtrl', function($scope, $http){
	$scope.items = [];
	$scope.showGenre = false;
	$scope.showYear = false;
	$scope.itemtypes = {};
	$http.get('/src/js/data/data.json').success(function(data) { 
		$scope.items = data.media;
		angular.forEach($scope.items, function(item, key) {
			var genre =  item.genre.join(', ');
			item['newGen'] = genre;
			angular.forEach(item.genre, function(genre, key) {
				$scope.itemtypes[genre] = true;
			})
		})
	});

	// Clear Filters button
	$scope.clearFilters = function() {
		angular.forEach($scope.items, function(item, key) {
			angular.forEach(item.genre, function(genre, key) {
				$scope.itemtypes[genre] = false;
			})
		})
	}
	// Toggle genre picklist
	$scope.genreClick = function() {
		$scope.showGenre = !$scope.showGenre;
	}
	$scope.yearClick = function() {
		$scope.showYear = !$scope.showYear;
	}
})

// Api Call and update for CTA
.controller('CtaController', function ($scope, $http) {
	$scope.ctaHtml = "Integer purus tellus, lacinia sit amet quam sit amet, tempus facilisis lacus. Phasellus a velit ipsum. In turpis purus, sollicitudin eget commodo a, rutrum nec tellus. Aenean scelerisque, neque non fringilla auctor, ligula quam condimentum purus.";
	$scope.ctaClick = function () {
		$http.get('http://api.icndb.com/jokes/random').success(function (data) {
			$scope.ctaHtml = data.value.joke;
		});
	};
});

// Custom filter for items
myApp.filter('itemtypefilter', function () {
  return function(input, filter) {
    var result = [];
    angular.forEach(input, function (item) {
        angular.forEach(filter, function (isfiltered, type) {
        	angular.forEach(item.genre, function(genre, key) {
        		if (isfiltered && type == genre) {
        			if (result.includes(item) === false) {
        				result.push(item);
        			}
        		}
        	})
        });
    });
    return result;
  };
});

