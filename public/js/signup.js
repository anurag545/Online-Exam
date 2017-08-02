var app=angular.module('formApp',[]);


app.directive('fileModel', ['$parse', function($parse){
	return {
		restrict: 'A',
		link: function(scope, element, attrs){
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;

			element.bind('change', function(){
				scope.$apply(function(){
					modelSetter(scope, element[0].files[0]);
				})
			})
		}
	}
}])
app.service('multipartForm', ['$http', function($http){
	this.post = function(uploadUrl, data){
		var fd = new FormData();
		for(var key in data)
			fd.append(key, data[key]);
		console.log(data);
		$http.post(uploadUrl, fd, {
			transformRequest: angular.indentity,
			headers: { 'Content-Type': undefined }
		}).then(function (response){console.log("done signup");
		if(response.status==200){
			console.log("ok");
     window.location="/loginpage";
         }
	},function (err){console.log("error sign up")});
	}
}]);
app.controller('formCtrl',['$scope','multipartForm',function ($scope,multipartForm){
$scope.myForm={};

$scope.myForm.uname="";

$scope.myForm.email="";

$scope.myForm.phone="";

$scope.myForm.pwd="";

$scope.myForm.cpwd="";

$scope.myForm.address="";

$scope.myForm.country="";

$scope.myForm.gender="";

$scope.myForm.job="";

$scope.myForm.dob="";
$scope.myForm.profilepic="";
$scope.myForm.epwd="";

$scope.myForm.Submit=function (){
	if($scope.myForm.pwd!=$scope.myForm.cpwd){
		console.log($scope.myForm.pwd,$scope.myForm.cpwd);
		$scope.epwd="Pass didnt match";
	     return false;
	}else{
		var uploadUrl = '/signup';
		multipartForm.post(uploadUrl, $scope.myForm);
   }     
}
}]);