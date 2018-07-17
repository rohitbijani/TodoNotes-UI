myApp.controller('homeController', function($scope,$mdSidenav,$state){
  $scope.toggleLeft=buildToggler('left');

  function buildToggler(componentID) {
    return function() {
      $mdSidenav(componentID).toggle();
    };
  }
  $scope.isVisible = false;
  $scope.showProfile = function() {
    $scope.isVisible = $scope.isVisible ? false : true;
  }
});
