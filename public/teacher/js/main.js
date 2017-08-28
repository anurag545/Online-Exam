var app=angular.module('indexApp', []);
angular.bootstrap(document.getElementById('mainpage'),['indexApp']);
app.controller('indexCtrl',['$scope','$http','$filter',function($scope,$http,$filter){
  console.log("hello");
  $http.get('/teacher/getproupexams').then(function(response){
   //console.log(response.data);
    $scope.exams=response.data.exams;
    $scope.groupsName=response.data.groups;
    //console.log($scope.exams,"exams",$scope.groupsName,"groups");
  },function(error){
   console.log("error in getexam http");
 });
 $http.get('/teacher/countproexams').then(function(response){
  console.log(response.data);
   $scope.progress=response.data.count;
 },function(error){
  console.log("error in getexam http");
});/*
$http.get('/teacher/countcomexams').then(function(response){
 console.log(response.data);
  $scope.completed=response.data.count;
},function(error){
 console.log("error in getexam http");
});
/*
$http.get('/teacher/countupexams').then(function(response){
 console.log(response.data);
  $scope.upcoming=response.data.count;
},function(error){
 console.log("error in getexam http");
});*/
}]);
