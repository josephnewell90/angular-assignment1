
angular.module('RepsApp', [
  'RepsAppControllers'
]);

angular
  .module('RepsAppControllers', [])
  .controller('MainCtrl', function ($http) {
    var main = this;
    main.reps = [];

    main.searchByZip = function (zip) {
      $http
        .get('http://dgm-representatives.herokuapp.com/all/by-zip/' + zip)
        .then(function (response) {
          main.reps = response.data;
        });
    };
  });

