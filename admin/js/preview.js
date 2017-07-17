var appPreview=angular.module('previewApp', []);
appPreview.config(['$locationProvider', function($locationProvider){
  $locationProvider.html5Mode({
  enabled: true,
  requireBase: false
});
}]);
appPreview.controller('previewCtrl',['$scope','$http','$location',function($scope,$http,$location){
  $scope.examid=$location.search().examid;
  $scope.exam={};
  $scope.questions={};
  //console.log($scope.examid);
  $http.get('/examDetails?examid='+$scope.examid).then(function(response){
     $scope.exam=response.data;
    console.log("exams",$scope.exam);

  },function(error){
    console.log("error in preview exam details http");
  });
$http.get('/questionsDetails?examid='+$scope.examid).then(function(response){
$scope.questions=response.data;
console.log($scope.questions);

},function (error){console.log("error in previre http questions")});
$http.get('/home').then(function(response){
  console.log("finish");
}
}]);
