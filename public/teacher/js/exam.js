var app=angular.module('examApp', []);
angular.bootstrap(document.getElementById('groupPage'),['examApp']);
app.controller('examCtrl',['$scope','$http','$filter',function($scope,$http,$filter){
  $http.get('/teacher/getexams').then(function(response){
   console.log(response.data);
    $scope.exams=response.data.exams;
    $scope.groupsName=response.data.groups;
    console.log($scope.exams,"exams",$scope.groupsName,"groups");
  },function(error){
   console.log("error in getexam http");
 });
$scope.Remove=function (examid){
  var examid={
    examid:examid
  }
  $http.post('/teacher/deleteExam',examid).then(function(response){
    console.log(response.data);
    var exam=response.data;
    var foundexam = $filter("filter")($scope.exams, {examName:exam}, true)[0];
     var index=$scope.exams.indexOf(foundexam);
     $scope.exams.splice(index,1);
  });
}
$scope.EditExam=function(examid){
window.location="/teacher/editexam?examid="+examid;
}
}]);
