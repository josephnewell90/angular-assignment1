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

    main.loading = false;
    main.searched = false;

    main.apis = [
      {
        label: 'Zip',
        method: function (zip) {
          main.loading = true;
          reps('all', 'zip', zip).then(function (data) { //.then handles the Promise of the previous call, making things asynchronous and much easier to read
            main.loading = false;
            main.reps = data;
            main.searched = true;
          });
        }
      },
      {
        label: 'Last Name',
        method: function (name, congressType) {
          main.loading = true;
          reps(main.congressType, 'name', name).then(function (data) {
            main.reps = data;
            main.loading = false;
            main.searched = true;
          });
        }
      },
      {
        label: 'State',
        method: function (state) {
          main.loading = true;
          reps(main.congressType, 'state', state).then(function (data) {
            main.reps = data;
            main.loading = false;
            main.searched = false;
          });
        }
      }
    ];

    main.criteria = main.apis[0];

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

    return search;
  });
