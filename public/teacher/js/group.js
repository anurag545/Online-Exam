var appGroup=angular.module('groupApp', []);
angular.bootstrap(document.getElementById('groupPage'),['groupApp']);
/*
appGroup.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/teacher/group/',{
   templateUrl : "../../../views/teacher/groupsdetail.html",
    //template : "<h1>Main Route 1</h1><p>Click on the links to change this content {{uid}}</p>",
    controller :'groupsCtrl'
  }).when('/addqroup',{

        templateUrl:"../../../views/teacher/addgroupdetail.html",
        controller :'addgroupCtrl'
    })
}]);*/
appGroup.controller('groupCtrl',['$scope','$http','$location','$filter',function($scope,$http,$location,$filter){
  $scope.groups=[];
  $http.get('/teacher/getgroups').then(function(response){
   console.log(response.data);
    //console.log("done");
    //$log.log($scope.examid);
    $scope.groups=response.data;
  },function(error){
   console.log("error in group http");
 });

}]);
