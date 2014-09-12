hackathon.app.controller('usersList', function ($scope) {

  $scope.title =  "Users list";

  hackathon.socket.on('usersUpdated', function(data){
    $scope.users = data;
    $scope.$apply();
  });

});