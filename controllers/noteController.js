myApp.controller('noteController', function($scope,$state,$mdSidenav,httpOperations,$mdDialog){

  $scope.colors = [
    ["white", "#ff8a80", "#ffd180", "#ffff8d"],
    ["#ccff90", "#a7ffeb", "#80d8ff", "#82b1ff"],
    ["#b388ff", "#f8bbd0", "#d7ccc8", "#cfd8dc"]
  ];

  $scope.selected = [];
  $scope.today = new Date().toISOString().split('T')[0];

  $scope.toggleLeft=buildToggler('left');

  function buildToggler(componentID) {
    return function() {
      $mdSidenav(componentID).toggle();
      var isOpen = $mdSidenav(componentID).isOpen();
      if(isOpen) {
        document.getElementById('dashboard').style.marginLeft = '280px';
        document.getElementById('createNote1').style.margin = "32 200 20px";
        document.getElementById('createNote2').style.margin = "32 200 20px";
        document.getElementById('dashboard-pinned').style.margin = "0px 120px";
        document.getElementById('dashboard-notes').style.margin = "0px 120px";
      }
      else {
        document.getElementById('dashboard').style.marginLeft = '0px';
        document.getElementById('createNote1').style.margin = "32 340 20px";
        document.getElementById('createNote2').style.margin = "32 340 20px";
        document.getElementById('dashboard-pinned').style.margin = "0px 255px";
        document.getElementById('dashboard-notes').style.margin = "0px 255px";
      }
    };
  }

  $scope.isVisible = false;
  $scope.showProfile = function() {
    $scope.isVisible = $scope.isVisible ? false : true;
  }

  $scope.open = false;
  $scope.mouseover = function () {
    $scope.open = true;
  }
  $scope.mouseleave = function () {
    $scope.open = false;
  }

  $scope.createNote = function() {
    var title=$scope.title;
    var description=$scope.description;
    console.log("title.. ",title);

    if((title!=null || description!=null) && (title!="" || description!="") && (title!=undefined || description!=undefined)){
      $scope.note = {
        "title" : title,
        "description" : description,
        "color" : $scope.bgcolor
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

  $scope.deleteNote = function(ev, noteObject) {
    var url = "http://192.168.0.70:8080/notes/delete-note/"+noteObject.id;
    console.log(noteObject.id);

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

  $scope.signout = function () {
    localStorage.removeItem('token');
    $state.go('login');
  }

  $scope.reminders = function () {

  }

  $scope.changeColor = function (color, noteObject) {
    $scope.bgcolor = color;

    if (noteObject!=undefined) {
      noteObject.color = color;
      $scope.updateNote(noteObject);
    }
  }

  $scope.trashNote = function(ev, noteObject) {
    noteObject.trash = "true";
    $scope.updateNote(noteObject);
  }

  $scope.restoreNote = function(ev, noteObject) {
    noteObject.trash = "false";
    $scope.updateNote(noteObject);
  }

  $scope.pinNote = function(ev, noteObject) {
    noteObject.pinned = "true";
    $scope.updateNote(noteObject);
  }

  $scope.unpinNote = function(ev, noteObject) {
    noteObject.pinned = "false";
    $scope.updateNote(noteObject);
  }

  $scope.archiveNote = function(ev, noteObject) {
    noteObject.archived = "true";
    $scope.updateNote(noteObject);
  }

  $scope.unarchiveNote = function(ev, noteObject) {
    noteObject.archived = "false";
    $scope.updateNote(noteObject);
  }

  $scope.isGrid = true;
  var elements = document.getElementsByClassName("note-card");
  $scope.listView = function() {
    for (i = 0; i < elements.length; i++) {
      elements[i].style.width = "600px";
    }
    $scope.isGrid = $scope.isGrid ? false : true;
  }

  $scope.gridView = function() {
    for (i = 0; i < elements.length; i++) {
      elements[i].style.width = "240px";
    }
    $scope.isGrid = $scope.isGrid ? false : true;
  }

  $scope.gotoNotes = function() {
    $state.go('home.notes');
  }

  $scope.gotoReminders = function() {
    $state.go('home.reminders');
  }

  $scope.gotoLabel = function (labelObject) {
    $scope.getLabelNotes(labelObject);
    $state.go('home.label');
  }

  $scope.gotoArchive = function() {
    $state.go('home.archive');
  }

  $scope.gotoTrash = function() {
    $state.go('home.trash');
  }

  $scope.getLabels = function () {
    $scope.labels=[];
    var url = "http://192.168.0.70:8080/notes/view-labels";

    httpOperations.getRequest(url)
    .then(function successCallback(response) {
      $scope.labels = response.data;
      console.log($scope.labels);
    }, function errorCallback(response) {
      console.log(response.data.message);
    });
  }

  $scope.labelList = function (noteObject) {
    var labelArray = noteObject.labels;
    // if (labelArray.length > 0) {
    labelArray.forEach(function(element) {
      $scope.selected.push(element.name);
    });
    console.log("label list.. ",$scope.selected);
    // }
  }

  $scope.applyLabel = function (item, noteObject, list) {
    $scope.labelNote={
      "labelId" : item.id,
      "noteId" : noteObject.id
    }
    var idx = list.indexOf(item.name);
    if (idx > -1) {
      // list.splice(idx, 1);
      $scope.removeLabel($scope.labelNote);
      $scope.getLabels();
    }
    else {
      // list.push(item);
      $scope.addLabel($scope.labelNote);
      $scope.getLabels();
    }
  };

  $scope.addLabel = function (labelNote) {
    var url = "http://192.168.0.70:8080/notes/add-label";
    var data = labelNote;

    httpOperations.postRequest(url,data)
    .then(function successCallback(response) {
      $scope.getNotes();
      console.log(response.data.message);
    }, function errorCallback(response) {
      console.log(response.data.message);
    });
  };

  $scope.removeLabel = function (labelNote) {
    var url = "http://192.168.0.70:8080/notes/remove-label";
    var data = labelNote;

    httpOperations.postRequest(url,data)
    .then(function successCallback(response) {
      $scope.getNotes();
      console.log(response.data.message);
    }, function errorCallback(response) {
      console.log(response.data.message);
    });
  };

  $scope.removeNoteLabel = function (labelObject, noteObject, ev) {
    var removeObject = {
      "labelId" : labelObject.id,
      "noteId" : noteObject.id
    }
    $scope.removeLabel(removeObject);
  };

  $scope.exists = function (item, list) {
    // console.log(list.indexOf(item) > -1);
    return list.indexOf(item) > -1;
  };

  $scope.labelNotes=[];
  $scope.getLabelNotes = function (labelObject) {
    var url = "http://192.168.0.70:8080/notes/view-labelnotes";
    var data = labelObject;

    httpOperations.postRequest(url,data)
    .then(function successCallback(response) {
      // $scope.getLabelNotes();
      console.log(response.data.message);
    }, function errorCallback(response) {
      console.log(response.data.message);
    });

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
    $scope.x = noteUpdate;
    console.log(noteUpdate);
    $scope.closeDialog = function() {
      console.log($scope.x.title);
      $scope.updateNote($scope.x);
      $mdDialog.hide();
    }
  }

  $scope.showLabels = function(ev) {
    $mdDialog.show({
      controller: labelAlert,
      templateUrl: 'templates/labelAlert.html',
      parent: angular.element(document.body),
      scope: $scope.$new(),
      targetEvent: ev,
      clickOutsideToClose:true
    });
  };

  function labelAlert($scope, $mdDialog) {
    // $scope.labelObject=labelObject;
    $scope.closeDialog = function() {
      $mdDialog.hide();
    }

    $scope.showLabel=true;
    console.log($scope.showLabel);
    $scope.showCreateLabel = function (ev) {
      $scope.showLabel = true ? false : true;
    }

    $scope.createLabel = function () {
      var name=$scope.labelName;
      console.log("name..." +name);

      if(name!=null && name!=undefined) {
        $scope.label={
          "name": name
        }
        var url = "http://192.168.0.70:8080/notes/create-label";
        var data = $scope.label;

        httpOperations.postRequest(url,data)
        .then(function successCallback(response) {
          $scope.getLabels();
          console.log(response.data.message);
        }, function errorCallback(response) {
          console.log(response.data.message);
        });
      }
    }

    $scope.deleteLabel = function(labelObject) {
      var url = "http://192.168.0.70:8080/notes/delete-label/"+labelObject.id;

      httpOperations.deleteRequest(url)
      .then(function successCallback(response) {
        $scope.getLabels();
      }, function errorCallback(response) {
        console.log(response.data.message);
      });
    }

    $scope.updateLabel = function(labelObject) {
      var url = "http://192.168.0.70:8080/notes/update-label";
      $scope.label = {
        "id" : labelObject.id,
        "name" : labelObject.name
      };

      console.log($scope.label.name);

      httpOperations.putRequest(url,$scope.label)
      .then(function successCallback(response) {
        $scope.getLabels();
        console.log(response);
      }, function errorCallback(response) {
        console.log(response.data.message);
      });
    }

    $scope.getLabels();
  }

  $scope.getNotes();
  $scope.getLabels();

});
