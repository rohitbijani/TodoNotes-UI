myApp.controller('dashboardController', function($scope,$state,httpOperations){

  $scope.createNote = function() {
    var title=$scope.title;
    var description=$scope.description;

    if(title!=null || description!=null){
      $scope.note = {
        "title" : title,
        "description" : description
      };
      var url = "http://192.168.0.55:8080/notes/create-note";
      var data = $scope.note;

      httpOperations.postRequest(url,data)
      .then(function successCallback(response) {
        $scope.getNotes();
        console.log(response.data.message);
      }, function errorCallback(response) {
        console.log(response.data.message);
      });
    }
  }

  $scope.getNotes = function() {
    $scope.notes=[];
    var url = "http://192.168.0.55:8080/notes/view-notes";

    httpOperations.getRequest(url)
    .then(function successCallback(response) {
      $scope.notes = response.data;
      console.log($scope.notes);
    }, function errorCallback(response) {
      console.log(response.data.message);
    });
  }

  $scope.getNotes();

});
