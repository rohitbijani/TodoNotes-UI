myApp.controller('labelController', function($scope,$state,$mdSidenav,httpOperations,$mdDialog){
    $scope.createLabel = function () {
      var name=$scope.name;

      if(name!=null && name!=undefined) {
        $scope.label={
          "name": name
        }
        var url = "http://192.168.0.70:8080/notes/create-label";
        var data = $scope.label;

        httpOperations.postRequest(url,data)
        .then(function successCallback(response) {
          $scope.getNotes();
          console.log(response.data.message);
        }, function errorCallback(response) {
          console.log(response.data.message);
        });
      }
    }

});
