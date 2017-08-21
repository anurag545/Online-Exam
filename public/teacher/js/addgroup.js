var appAddGroup=angular.module('addgroupApp', []);
angular.bootstrap(document.getElementById('groupPage'),['addgroupApp']);
appAddGroup.controller('addgroupCtrl',['$scope','$http','$filter',function($scope,$http,$filter){
  var urlParams = new URLSearchParams(window.location.search);
  $scope.examid=urlParams.get('examid');
  $scope.users=[];
  $scope.entries="";
  $scope.searchText = null;
  $scope.groupName="";
  $scope.change = function(text) {
      if($scope.searchText && $scope.searchText.length>3){
           $(".search").fadeIn("fast");
             $scope.msg="";
      $http.get('/teacher/getuser?users=' + $scope.searchText).then(function(response){
          $scope.entries= response.data;
        });
       }
       else{
           $scope.entries="";
       }
    };

  $(document).click( function(){
      $('.search').hide();
    });

  $scope.User=function(user){
    var newTemp = $filter("filter")($scope.users, {email:user.email}, true);
    if(newTemp.length==0){
    $scope.users.push(user);
      $scope.searchText = null;
    }
    else if(!newTemp.length==0){
      $scope.msg="Already added";
        $scope.searchText = null;
    }
  }
  $scope.remove=function(index){
    $scope.users.splice(index,1);
  }

  $scope.addgroup=function(){

   if($scope.groupName && $scope.users.length!="0"){
     var array=[];
     for(var key in $scope.users){
       console.log($scope.users[key].email);
       array.push($scope.users[key].email);
     }
     var groupObj={
       groupName:$scope.groupName,
       users:array,
       examid:$scope.examid
     }
     console.log(groupObj,$scope.examid);
     if($scope.examid){
       var url='/teacher/addgroup?examid='+$scope.examid;
     }
     if(!$scope.examid){
        var url='/teacher/addgroup';
     }
     console.log(url);
     $http.post(url,groupObj).then(function(response){
      console.log(response.data);
      $scope.users=[];
      $scope.groupName="";
       //console.log("done");
       //$log.log($scope.examid);
       //window.location="/teacher/newgroup?examid="+$scope.examid;
     },function(error){
      console.log("error in group http");
    });
   }else{
     if(!$scope.groupnName){
     $scope.error="Plz add group Name";}
     if($scope.users.length!="0"){
       $scope.error="PLz add atleast one student";
     }
   }
  }
}]);
