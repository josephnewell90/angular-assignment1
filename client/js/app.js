(function()
{

//Declare angular app
angular.module('RepsApp', []);

//Make Representative search controller
angular
  .module('RepsApp')
  .controller('RepsController', [function() {
    var self = this;
    //Keep track of the members to display
    self.members = [];
  }]);

//Get the Data
angular
  .module('RepsApp')
  .controller('RepsController', ['$http', function ($http) { //This adds the http service
    var self = this; //Get the members
    self.members = []; //Dump the members into an array

    //Update the data based on user input for ZIP
    //Zip
    self.searchByZip = function (zip) {
      $http
        .get('http://dgm-representatives.herokuapp.com/all/by-zip/' + zip)
        .then(function (res) {
          self.members = res.data;
        });
    };
    //State
    self.searchByState = function (state) {
      $http
        .get('http://dgm-representatives.herokuapp.com/all/by-state/' + state)
        .then(function (res) {
          self.members = res.data;
        });
    };
    //Name
    self.searchByName = function (name) {
      $http
        .get('http://dgm-representatives.herokuapp.com/all/by-name/' + name)
        .then(function (res) {
          self.members = res.data;
        });
    };

  }]);
})();
