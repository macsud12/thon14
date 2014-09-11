hackathon.app.controller('usersList', function ($scope) {

  $scope.title =  "Users list";
  $scope.users = [
    { name: "test1" },
    { name: "test2" },
    { name: "test3" }
  ];

  hackathon.socket.on('usersUpdated', function(data){
    $scope.users = data;
    $scope.$apply();
  });

});