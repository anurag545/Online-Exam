//var rootApp=angular.module('rootApp',['mainApp','examApp']);
var appMain = angular.module('mainApp',[]);
appMain.controller('mainCtrl',['$scope','$http',function($scope,$http){
$scope.Logout=function(){
   $http.get('/teacher/logout').then(function (response){
     if(response.status===200){
       console.log("done");
       window.location="/teacher/login";
     }
   });
}
$http.get('/teacher/name').then(function(response){
   $scope.name=response.data;
});
$scope.Profile=function (){
 window.location="/teacher/profile";
}
$scope.Setting=function (){
  console.log("dcsdcs");
  window.location="/teacher/settings";
}
}]);
appMain.controller('profileCtrl',['$scope','$http',function($scope,$http){
$http.get('/teacher/profileDetails').then(function(response){
 userProfile=response.data;
 console.log(userProfile);
 $scope.success="";
 $scope.myProfile={};
 if(userProfile){
   $scope.myProfile.name=userProfile[0].username;
   $scope.myProfile.phone=userProfile[0].phone;
   $scope.myProfile.email=userProfile[0].email;
   $scope.myProfile.address=userProfile[0].address;
   $scope.myProfile.country=userProfile[0].country;
   $scope.myProfile.gender=userProfile[0].gender;
   $scope.myProfile.job=userProfile[0].job;
   $scope.myProfile.birthdate=userProfile[0].birthdate;
   $scope.myProfile.profilepic=userProfile[0].profilepic;
 }
},function (error){console.log("error in profile http")});
 $scope.update=function () {
   var profileObj={
   name: $scope.myProfile.name,
   phone: $scope.myProfile.phone,
   address:$scope.myProfile.address,
   country:$scope.myProfile.country,
   gender:$scope.myProfile.gender,
   job:  $scope.myProfile.job,
   birthdate: $scope.myProfile.birthdate
   }
   console.log(profileObj);
   $http.post('/teacher/updateprofileDetails',profileObj).then(function(response){
    userProfile=response.data;
    $scope.success="Updated Succesfully";
    $scope.myProfile.name=userProfile.username;
    $scope.myProfile.phone=userProfile.phone;
    $scope.myProfile.address=userProfile.address;
    $scope.myProfile.country=userProfile.country;
    $scope.myProfile.gender=userProfile.gender;
    $scope.myProfile.job=userProfile.job;
    $scope.myProfile.birthdate=userProfile.birthdate;
    console.log("done");
   },function (error){console.log("error in profile http")});

 }
}]);

appMain.controller('settingsCtrl',['$scope','$http',function($scope,$http){
   $scope.oldpwd="";
   $scope.newpwd="";
   $scope.conpwd="";
   $scope.changePassword=function (){
   if($scope.newpwd===$scope.conpwd){
     var  changeObj={
       oldpwd:$scope.oldpwd,
       newpwd:$scope.newpwd
     };
     console.log(changeObj);
     $http.post('/teacher/changepwd',changeObj).then(function(response){
       if(response.status===200){
       $scope.oldpwd="";
       $scope.newpwd="";
       $scope.conpwd="";
       $scope.msg="Changed Succesfully";
      }
      console.log("done");
    },function (error){console.log("error in setting http")});
   }else{
     $scope.msg="New Password and Confirm Password didn't match";
   }
 }
}]);
