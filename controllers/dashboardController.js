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

  $scope.deleteNote =function(noteObject) {
    var url = "http://192.168.0.55:8080/notes/delete-note/"+noteObject.id;

    httpOperations.postRequest(url)
    .then(function successCallback(response) {
      $scope.getNotes();
    }, function errorCallback(response) {
      console.log(response.data.message);
    });
  }

  $scope.updateNote =function(note) {
    var url = "http://192.168.0.55:8080/notes/delete-note/"+note.id;
    $scope.note = {
      "title" : note.title,
      "description" : note.description,
      "color" : note.color,
      "trash" : note.trash,
      "pinned": note.pinned,
      "archived": note.archived
    };

    httpOperations.putRequest(url,note)
    .then(function successCallback(response) {
      $scope.getNotes();
    }, function errorCallback(response) {
      console.log(response.data.message);
    });
  }

  $scope.trashNote =function(note) {
    $scope.note = {
      "title" : note.title,
      "description" : note.description,
      "color" : note.color,
      "trash" : "true",
      "pinned": note.pinned,
      "archived": note.archived
    };

    $scope.updateNote(note);
  }

  $scope.getNotes();

});
