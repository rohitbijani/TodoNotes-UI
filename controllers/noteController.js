myApp.controller('noteController', function($scope,$state,$mdSidenav,httpOperations,$mdDialog){

  // $scope.colors = [
  //   [white, #ff8a80, #ffd180, #ffff8d],
  //   [#ccff90, #a7ffeb, #80d8ff, #82b1ff],
  //   [#b388ff, #f8bbd0, #d7ccc8, #cfd8dc]
  // ];
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

  $scope.createNote = function() {
    var title=$scope.title;
    var description=$scope.description;

    if((title!=null || description!=null) && (title!='' || description!='') && (title!=undefined || description!=undefined)){
      $scope.note = {
        "title" : title,
        "description" : description
      };
      var url = "http://192.168.0.70:8080/notes/create-note";
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
    var url = "http://192.168.0.70:8080/notes/view-notes";

    httpOperations.getRequest(url)
    .then(function successCallback(response) {
      $scope.notes = response.data;
      console.log($scope.notes);
    }, function errorCallback(response) {
      console.log(response.data.message);
    });
  }

  $scope.deleteNote = function(noteObject) {
    var url = "http://192.168.0.70:8080/notes/delete-note/"+noteObject.id;

    httpOperations.deleteRequest(url)
    .then(function successCallback(response) {
      $scope.getNotes();
    }, function errorCallback(response) {
      console.log(response.data.message);
    });
  }

  $scope.updateNote = function(noteObject) {
    var url = "http://192.168.0.70:8080/notes/update-note";
    $scope.note = {
      "id" : noteObject.id,
      "title" : noteObject.title,
      "description" : noteObject.description,
      "color" : noteObject.color,
      "trash" : noteObject.trash,
      "pinned" : noteObject.pinned,
      "archived" : noteObject.archived
    };

    httpOperations.putRequest(url,$scope.note)
    .then(function successCallback(response) {
      $scope.getNotes();
      console.log(response);
    }, function errorCallback(response) {
      console.log(response.data.message);
    });
  }

  $scope.trashNote = function(noteObject) {
    noteObject.trash = "true";
    $scope.updateNote(noteObject);
  }

  $scope.restoreNote = function(noteObject) {
    noteObject.trash = "false";
    $scope.updateNote(noteObject);
  }

  $scope.pinNote = function(noteObject) {
    noteObject.pinned = "true";
    $scope.updateNote(noteObject);
  }

  $scope.unpinNote = function(noteObject) {
    noteObject.pinned = "false";
    $scope.updateNote(noteObject);
  }

  $scope.archiveNote = function(noteObject) {
    noteObject.archived = "true";
    $scope.updateNote(noteObject);
  }

  $scope.unarchiveNote = function(noteObject) {
    noteObject.archived = "false";
    $scope.updateNote(noteObject);
  }

  // $scope.isArchived = function(noteObject) {
  //   return noteObject.archived;
  // }
  $scope.gotoNotes = function() {
    $state.go('home.notes');
  }

  $scope.gotoReminders = function() {
    $state.go('home.reminders');
  }

  $scope.gotoArchive = function() {
    $state.go('home.archive');
  }

  $scope.gotoTrash = function() {
    $state.go('home.trash');
  }

  $scope.showAlert = function(ev,noteObject) {
    $mdDialog.show({
      locals: {noteUpdate : noteObject},
      controller: DialogController,
      templateUrl: 'templates/dialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    });
  };

  function DialogController($scope, $mdDialog, noteUpdate) {
    $scope.noteUpdate = noteUpdate;
    $scope.closeDialog = function() {
      $mdDialog.hide();
    }
  }

  $scope.getNotes();

});
