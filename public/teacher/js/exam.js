var app=angular.module('examApp', []);
angular.bootstrap(document.getElementById('groupPage'),['examApp']);
app.controller('examCtrl',['$scope','$http','$location','$filter',function($scope,$http,$location,$filter){
  $scope.groups=[];
  $http.get('/teacher/getexams').then(function(response){
   console.log(response.data);
    $scope.exam=response.data;
  },function(error){
   console.log("error in getexam http");
 });

}]);
