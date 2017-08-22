var appGroup=angular.module('groupApp', []);
angular.bootstrap(document.getElementById('groupPage'),['groupApp']);
appGroup.controller('groupCtrl',['$scope','$http','$filter',function($scope,$http,$filter){
  $scope.groups=[];
  var urlParams = new URLSearchParams(window.location.search);
  $scope.examid=urlParams.get('examid');
  $scope.success="";
  $http.get('/teacher/getgroups').then(function(response){
   console.log(response.data);
    //console.log("done");
    //$log.log($scope.examid);
    $scope.groups=response.data;
  },function(error){
   console.log("error in group http");
 });
 $scope.remove=function (id){
   console.log(id);
   var group={
     groupid:id
   }
   $http.post('/teacher/deleteGroup',group).then(function(response){
     console.log(response.data);
     var group=response.data;
     var foundgroup = $filter("filter")($scope.groups, {groupName:group}, true)[0];
      var index=$scope.groups.indexOf(foundgroup);
      $scope.groups.splice(index,1);
   });
 }

$scope.Add=function(id){
   console.log(id);
   var addGroup={
     examId:$scope.examid,
     groupId:id
   }
   console.log(addGroup);
   $http.post('/teacher/addGroupId',addGroup).then(function(response){
     if(response.status==200){
       $scope.success=" Group Added Succesfully";
     }
   });
 }
 $scope.EditGroup=function(groupid){
    if($scope.examid){
    window.location="/teacher/editgroup?groupid="+groupid+"&examid="+$scope.examid;
    }
    else if(!$scope.examid){
    window.location="/teacher/editgroup?groupid="+groupid;
    }
  }
}]);
