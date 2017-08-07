var appPreview=angular.module('previewApp', ['ngCookies']);
appPreview.config(['$locationProvider', function($locationProvider){
  $locationProvider.html5Mode({
  enabled: true,
  requireBase: false
});
}]);
appPreview.controller('previewCtrl',['$scope','$cookieStore','$http','$location',function($scope,$cookieStore,$http,$location){
  $scope.examid=$location.search().examid;
  $scope.exam={};
  $scope.questions={};
  //var tokenObj=$cookieStore.get('tokenObj');
  //console.log(tokenObj);
  //console.log(tokenObj.token);
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
 $scope.optionArr=["A","B","C","D"];
$scope.SaveOnly=function(){
window.location="/home";
}
}]);
