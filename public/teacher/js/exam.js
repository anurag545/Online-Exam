var app=angular.module('examApp', []);
angular.bootstrap(document.getElementById('groupPage'),['examApp']);
app.controller('examCtrl',['$scope','$http','$filter',function($scope,$http,$filter){
  $http.get('/teacher/getexams').then(function(response){
   console.log(response.data);
    $scope.exams=response.data;

  },function(error){
   console.log("error in getexam http");
 });
$scope.remove=function (exam){
  console.log(JSON.stringify(exam))
  var exam={
    exam:exam
  }
  $http.post('/teacher/deleteExam',JSON.stringify(exam)).then(function(response){
    console.log(response.data);
    var exam=response.data;
    var foundexam = $filter("filter")($scope.exams, {examName:exam}, true)[0];
     var index=$scope.exams.indexOf(foundexam);
     $scope.exams.splice(index,1);
  });
}
}]);
