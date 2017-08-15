var appPreview=angular.module('groupApp', []);
angular.bootstrap(document.getElementById('groupPage'),['groupApp']);
appPreview.config(['$locationProvider', function($locationProvider){
  $locationProvider.html5Mode({
  enabled: true,
  requireBase: false
});
}]);
appPreview.controller('groupCtrl',['$scope','$http','$location','$timeout',function($scope,$http,$location,$timeout){
  $scope.examid=$location.search().examid;
  $scope.exam={};
  $scope.questions={};
  $scope.users=[];
  $scope.entries="";
  $scope.searchText = null;
  $scope.change = function(text) {
      if($scope.searchText && $scope.searchText.length>3){
             $("#search").fadeIn("fast");
      $http.get('/teacher/getuser?users=' + $scope.searchText).then(function(response){
          $scope.entries= response.data;
        });
       }
       else{
           $scope.entries="";
       }
    };
    $(document).click( function(){
      $('#search').hide();
    });
  $scope.User=function(user){
    $scope.users.push(user);
  }

}]);
