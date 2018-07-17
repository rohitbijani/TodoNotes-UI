
/****
*@author
*@date
*@purpose
*@description
****/
myApp.controller('userController', function($scope,$state,httpOperations){
  $scope.word = /^([a-zA-Z0-9])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i;

  $scope.validate = function() {
    $scope.user = {
      "email" : $scope.email,
      "password" : $scope.password
    };
    console.log($scope.user.email);
    var url = "http://192.168.0.55:8080/notes/login";
    var data = $scope.user;

    httpOperations.postRequest(url,data)
    .then(function successCallback(response) {
      console.log(response.data.message);
      // var token = response.headers(['Authorization']);
      var token = response.data.message;
      localStorage.setItem("token", token);

      $state.go('home.dashboard');
    }, function errorCallback(response) {
      console.log(response.data.message);
    });
  }

  $scope.register = function () {
    $scope.user = {
      "name" : $scope.name,
      "email" : $scope.email,
      "password" : $scope.password,
      "mobileNumber" : $scope.mobileNumber
    };
    var url = "http://192.168.0.55:8080/notes/registration";
    var data = $scope.user;

    httpOperations.postRequest(url,data)
    .then(function successCallback(response) {
      console.log(response.data.message);
      $state.go('login');
    }, function errorCallback(response) {
      console.log(response.data.message);
    });
  }

  $scope.gotoLogin = function() {
    $state.go('login');
  }

  $scope.gotoRegister = function() {
    $state.go('register');
  }

  $scope.gotoForgot = function() {
    $state.go('forgotPassword');
  }

});
