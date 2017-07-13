var app = angular.module('examApp', ['ngRoute']);
app.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/addque/:examid',{
   templateUrl : "addquestions.html",
    //template : "<h1>Main Route 1</h1><p>Click on the links to change this content {{uid}}</p>",
    controller :'quesCtrl'
    }).when('/',{
        templateUrl:"newexamdetail.html",
        controller :'examCtrl'
    })
}]);

app.controller('examCtrl',['$scope','$http','$log',function ($scope,$http,$log){
$scope.examForm={};

$scope.examForm.xname="";

$scope.examForm.xdes="";

$scope.examForm.xdate="";

$scope.examForm.xtime="";

$scope.examForm.xmarks="";

$scope.examForm.xdur="";

                                   
   
var picker = new Pikaday(
 {
     field: document.getElementById('datepicker'),
      format: 'YYYY-MM-DD',
   firstDay: 1,
       minDate: new Date(1930,1,1),
    maxDate: new Date(2020, 12, 31),
  yearRange: [1930,2020],

   });

$scope.examForm.examSubmit=function (){
 var examObj={
    examname:$scope.examForm.xname,
    examdes:$scope.examForm.xdes,
    examdate:$scope.examForm.xdate,
    exammarks:$scope.examForm.xmarks,
    examtime:$scope.examForm.xtime,
    examdur:$scope.examForm.xdur
  };
$http.post('/examdetails',examObj).then(function(response){
 $scope.examid=response.data;
 //console.log("done");
  $log.log($scope.examid);
  window.location="/newexam.html#!/addque/:"+$scope.examid;
},function(error){
 console.log("error in xam http");
});
}
}]);


 app.controller('quesCtrl',function ($scope,$routeParams,$log){
    $scope.examid=$routeParams.examid;
    $log.log($scope.uid);
    
    $scope.quesForm.ques=""
    $scope.quesForm.type=""
    $scope.quesForm.ansObj=""
    $scope.quesForm.optObjA=""
    $scope.quesForm.optObjB=""
    $scope.quesForm.optObjC=""
    $scope.quesForm.optObjD=""
    $scope.quesForm.alterType=""
    $scope.quesForm.ansMultiA=""
    $scope.quesForm.ansMultiB=""
    $scope.quesForm.ansMultiC=""
    $scope.quesForm.ansMultiD=""
    $scope.quesForm.optMultiA=""
    $scope.quesForm.optMultiB=""
    $scope.quesForm.optMultiC=""
    $scope.quesForm.optMultiD=""
    $scope.quesForm.marks=""
    $scope.quesForm.saveContinue()=function (){
    	console.log($scope.quesForm.type);
     if($scope.quesForm.type=="objective")
     {
        var optArraY=[];
        if($scope.quesForm.optObjA){
        	optArray.push($scope.quesForm.optObjA);
        } if($scope.quesForm.optObjB){
        	optArray.push($scope.quesForm.optObjB);
        } if($scope.quesForm.optObjB){
        	optArray.push($scope.quesForm.optObjC);
        } if($scope.quesForm.optObjB){
        	optArray.push($scope.quesForm.optObjD);
        }
       console.log(optArray);
        var quesObj={
         examid:	$scope.examid
         quesType: $scope.quesForm.type,	
         question: $scope.quesForm.ques,
         answer:   $scope.quesForm.ansObj,
         options:  optArray,
         marks:    $scope.quesForm.marks
        }; 
        console.log(quesObj);
     }
     else if($scope.quesForm.type=="true-false"){
         var quesObj={
         examid:	$scope.examid
         quesType: $scope.quesForm.type,	
         question: $scope.quesForm.ques,
         answer:   $scope.quesForm.alterType,
         marks:    $scope.quesForm.marks
         };
         console.log(quesObj);
     }
     else if($scope.quesForm.type=="multiselect")
     	 
     	 var optArraY=[];
     	var  ansArray=[];
        if($scope.quesForm.optMultiA){
        	optArray.push($scope.quesForm.optMultiA);
        } if($scope.quesForm.optMultiB){
        	optArray.push($scope.quesForm.optMultiB);
        } if($scope.quesForm.optMultiC){
        	optArray.push($scope.quesForm.optMultiC);
        } if($scope.quesForm.optMultiD){
        	optArray.push($scope.quesForm.optMultiD);
        }

        if($scope.quesForm.ansMultiA){
        	ansArray.push($scope.quesForm.ansMultiA);
        } if($scope.quesForm.ansMultiB){
        	ansArray.push($scope.quesForm.ansMultiB);
        } if($scope.quesForm.ansMultiC){
        	ansArray.push($scope.quesForm.ansMultiC);
        } if($scope.quesForm.ansMultiD){
        	ansArray.push($scope.quesForm.ansMultiD);
        }
         console.log(optArray,ansArray);
         var quesObj={ 
         examid:	$scope.examid
         quesType: $scope.quesForm.type,	
         question: $scope.quesForm.ques,
         answer:   ansArray,
         options:  optArray,
         marks:    $scope.quesForm.marks
         };
         console.log(quesObj);
    };
    $scope.quesForm.finish()=function (){


    };



     });
