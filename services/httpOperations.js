myApp.factory('httpOperations',function($http){
var factory={};

factory.getRequest = function(url){
  return $http({
    method : "GET",
    url : url,
    headers : {
      'Content-Type' : 'application/json',
      'token' : localStorage.getItem("token")
    }
  });
}

factory.postRequest = function(url,data){
  return $http({
    method : "POST",
    url : url,
    data : data,
    headers : {
      'Content-Type' : 'application/json',
      'token' : localStorage.getItem("token")
    }
  });
}

factory.putRequest = function(url,data){
  return $http({
    method : "PUT",
    url : url,
    data : data,
    headers : {
      'Content-Type' : 'application/json',
      'token' : localStorage.getItem("token")
    }
  });
}

factory.deleteRequest = function(url,data){
  return $http({
    method : "DELETE",
    url : url,
    data : data,
    headers : {
      'Content-Type' : 'application/json',
      'token' : localStorage.getItem("token")
    }
  });
}

return factory;

});
