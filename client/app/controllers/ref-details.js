'use strict';

angular.module('freefootieApp')
  .controller('RefDetailsCtrl', function ($scope, $routeParams, $resource) {
      var Team = $resource('/api/teams/:id');
      var Location = $resource('/api/locations/:id');
      var Game = $resource('/api/games/:id');
      $scope.game = Game.get({id:$routeParams.id}, function(game){
        game._location = Location.get({id: game.location});
        game._away = Team.get({id: game.away});
        game._home = Team.get({id: game.home});
      });

      $scope.location = {"latitude": 53.568033,
    "longitude": -113.446072};
      $scope.score = {home: 0,
      away: 0, checkedin: false};
      $scope.edit = {submitted: false};

       function saveLocally() {
        // To-do: save in temporary storage.
       }

       $scope.abs = function (num) {
        return num < 0 ? 0 : num;
       }
  });
