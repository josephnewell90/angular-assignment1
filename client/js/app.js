//Declare angular app
angular.module('RepsApp', [
  'RepsAppControllers'
]);
//Make Representative search controller
angular
  .module('RepsAppControllers', [
    'repsService'
  ])
  .controller ('MainCtrl', function (reps) {
    var main = this; //Get the reps
    main.reps = [];
    main.congressType = 'reps';

    main.apis = [
      {
        label: 'Zip',
        method: function (zip) {
          reps('all', 'zip', zip).then(function (data) {
            main.reps = data;
          });
        }
      },
      {
        label: 'Last Name',
        method: function (name, congressType) {
          reps(main.congressType, 'name', name).then(function (data) {
            main.reps = data;
          });
        }
      },
      {
        label: 'State',
        method: function (state) {
          reps(main.congressType, 'state', state).then(function (data) {
            main.reps = data;
          });
        }
      }
    ];

    main.criteria = main.apis[0];

    /*
    main.searchByZip = function (zip) {
      reps.allByZip(zip).then(function (data) {
        main.results = data;
      });
    };

    main.searchRepsByName = function (name) {
      reps.repsByName(name).then(function (data) {
        main.results = data;
      });
    };

    main.searchRepsByState = function (state) {
      reps.repsByState(state).then(function (data) {
        main.results = data;
      });
    };

    main.searchSenatorsByName = function (name) {
      reps.sensByName(name).then(function (data) {
        main.results = data;
      });
    };

    main.searchSenatorsByState = function (state) {
      reps.sensByState(state).then(function (data) {
        main.results = data;
      });
    };
    */

  });

angular
  .module('repsService', [])
  .factory('reps', function ($http) {
    var host = 'http://dgm-representatives.herokuapp.com';

    /*
    * @function Search
    * @param {string} type - can be "all", "reps", "sens"
    * @param {string} criteria - can be "zip", "name", "state"
    * @param {string} query - can be any string
    */
    function search(type, criteria, query) {
      return $http
        .get(host + '/' + type + '/by-' + criteria + '/' + query)
        .then(function (response) {
          return response.data;
        });
    }

    search.allByZip = search.bind(null, 'all', 'zip');
    search.repsByName = search.bind(null, 'reps', 'name');
    search.repsByState = search.bind(null, 'reps', 'state');
    search.sensByName = search.bind(null, 'sens', 'name');
    search.sensByState = search.bind(null, 'sens', 'state');

    return search;
  });
