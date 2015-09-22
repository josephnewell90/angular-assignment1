
angular.module('RepsApp', [
  'RepsAppControllers'
]);

angular
  .module('RepsAppControllers', [
    'repsService'
  ])
  .controller('MainCtrl', function (reps) {
    var main = this;
    main.reps = [];

    main.searchByZip = function (zip) {
      reps.allByZip(zip).then(function (data) {
        main.reps = data;
      });
    };

    main.searchRepsByName = function (name) {
      reps.repsByName(name).then(function (data) {
        main.reps = data;
      });
    };

    main.searchRepsByState = function (state) {
      reps.repsByState(state).then(function (data) {
        main.reps = data;
      });
    };

    main.searchSensByName = function (name) {
      reps.sensByName(name).then(function (data) {
        main.reps = data;
      });
    };

    main.searchSensByState = function (state) {
      reps.sensByState(state).then(function (data) {
        main.reps = data;
      });
    };
  });

angular
  .module('repsService', [])
  .factory('reps', function ($http) {
    var host = 'http://dgm-representatives.herokuapp.com';
    function returnData(response) { return response.data; }
    return {
      allByZip: function (zip) {
        return $http
          .get(host + '/all/by-zip/' + zip)
          .then(returnData);
      },
      repsByName: function (name) {
        return $http
          .get(host + '/reps/by-name/' + name)
          .then(returnData);
      },
      repsByState: function (state) {
        return $http
          .get(host + '/reps/by-state/' + state)
          .then(returnData);
      },
      sensByName: function (name) {
        return $http
          .get(host + '/sens/by-name/' + name)
          .then(returnData);
      },
      sensByState: function (state) {
        return $http
          .get(host + '/sens/by-state/' + state)
          .then(returnData);
      }
    };
  });


















