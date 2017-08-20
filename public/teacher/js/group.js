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
appGroup.controller('groupCtrl',['$scope','$http','$filter',function($scope,$http,$filter){
  $scope.groups=[];
  $http.get('/teacher/getgroups').then(function(response){
   console.log(response.data);
    //console.log("done");
    //$log.log($scope.examid);
    $scope.groups=response.data;
  },function(error){
   console.log("error in group http");
 });
 $scope.remove=function (group){
   console.log(JSON.stringify(group))
   var group={
     group:group
   }
   $http.post('/teacher/deleteGroup',JSON.stringify(group)).then(function(response){
     console.log(response.data);
     var group=response.data;
     var foundgroup = $filter("filter")($scope.groups, {groupName:group}, true)[0];
      var index=$scope.groups.indexOf(foundgroup);
      $scope.groups.splice(index,1);
   });
 }
}]);
