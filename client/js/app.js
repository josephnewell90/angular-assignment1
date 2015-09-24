
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

    /**
     * @function search
     * @param {String} type - can be "all", "reps", "sens"
     * @param {String} criteria - can by "zip", "name", "state"
     * @param {String} query - can any string
     */
    function search(type, criteria, query) {
      return $http
        .get(host + '/' + type + '/by-' + criteria + '/' + query)
        .then(function (response) {
          return response.data;
        });
    }

    search.allByZip    = search.bind(null, 'all', 'zip');
    search.repsByName  = search.bind(null, 'reps', 'name');
    search.repsByState = search.bind(null, 'reps', 'state');
    search.sensByName  = search.bind(null, 'sens', 'name');
    search.sensByState = search.bind(null, 'sens', 'state');

    return search;
  });


















