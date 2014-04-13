'use strict';

angular.module('freefootieApp')
.controller('TeamDetailsCtrl', function ($scope, $resource, $routeParams) {

    var Team = $resource('/api/teams/:id');
    var Division = $resource('/api/divisions/:id');

    $scope.edit = {editing: false};

    var teamCheckpoint = $scope.currentTeam = Team.get({id: $routeParams.id}, function(team) {
       teamCheckpoint = angular.copy(team);
    });

    $scope.$watch('currentTeam', function(newVal) {
      $scope.needsSave = !angular.equals(newVal, teamCheckpoint);
    }, true);

    $scope.divisions = Division.query();

    $scope.update = function(team) {
      team.$save().
           then(function(){
             teamCheckpoint = angular.copy(team);
             $scope.needsSave = false;
           });
    };

    $scope.cancel = function() {
      angular.copy(teamCheckpoint, $scope.currentTeam);
    };

  });
});
