var appPreview=angular.module('previewApp', []);
angular.bootstrap(document.getElementById('previewPage'),['previewApp']);
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
  //var tokenObj=$cookieStore.get('tokenObj');
  //console.log(tokenObj);
  //console.log(tokenObj.token);
  console.log($scope.examid);
  $http.get('/teacher/examDetails?examid='+$scope.examid).then(function(response){
     $scope.exam=response.data;
    console.log("exams",$scope.exam);
  },function(error){
    console.log("error in preview exam details http");
  });

$http.get('/teacher/questionsDetails?examid='+$scope.examid).then(function(response){
$scope.questions=response.data;
console.log("questions",$scope.questions);

},function (error){console.log("error in previre http questions")});

 $scope.optionArr=["A","B","C","D"];

$scope.SaveOnly=function(){
window.location="/teacher/home";
}
$scope.AddGroup=function(){
window.location="/teacher/group";
}
}]);
