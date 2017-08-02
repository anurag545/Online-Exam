var app = angular.module('examApp',['ngRoute']);
angular.bootstrap(document.getElementById('makeExam'),['examApp']);
app.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/',{
   templateUrl : "newexamdetail.html",
    //template : "<h1>Main Route 1</h1><p>Click on the links to change this content {{uid}}</p>",
    controller :'examCtrl'
    }).when('/addque/:examid',{
        templateUrl:"addquestions.html",
        controller :'quesCtrl'
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
       field: document.getElementById('datepickeronly'),
       format: 'YYYY-MM-DD',
       firstDay: 1,
       minDate: new Date(),
      maxDate: new Date(2020, 12, 31)

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


 app.controller('quesCtrl',['$scope','$routeParams','$http','$log',function ($scope,$routeParams,$http,$log){
    $scope.examid=$routeParams.examid;
    var idArray=$scope.examid.split(':');
    //$log.log(idArray[1]);
   $scope.examid=idArray[1];
    console.log($scope.examid);
    $scope.continue="";
    $scope.finish="";
    $scope.quesForm={};
    $scope.quesForm.ques="";
    $scope.quesForm.questype="";
    $scope.quesForm.ansObj="";
    $scope.quesForm.optObjA="";
    $scope.quesForm.optObjB="";
    $scope.quesForm.optObjC="";
    $scope.quesForm.optObjD="";
    $scope.quesForm.alterType="";
    $scope.quesForm.ansMultiA="";
    $scope.quesForm.ansMultiB="";
    $scope.quesForm.ansMultiC="";
    $scope.quesForm.ansMultiD="";
    $scope.quesForm.optMultiA="";
    $scope.quesForm.optMultiB="";
    $scope.quesForm.optMultiC="";
    $scope.quesForm.optMultiD="";
    $scope.quesForm.marks="";
        var quesObj={};
    var optArray=[];
    var  ansArray=[];
    $scope.quesForm.saveContinue=function (){

    	console.log($scope.quesForm.questype);
      var quesObj={};
  var optArray=[];
  var  ansArray=[];
     if($scope.quesForm.questype=="objective")
     {

        if($scope.quesForm.optObjA){
        	optArray.push($scope.quesForm.optObjA);
        } if($scope.quesForm.optObjB){
        	optArray.push($scope.quesForm.optObjB);
        } if($scope.quesForm.optObjC){
        	optArray.push($scope.quesForm.optObjC);
        } if($scope.quesForm.optObjD){
        	optArray.push($scope.quesForm.optObjD);
        }
        ansArray.push($scope.quesForm.ansObj);
      // console.log(optArray);
         quesDetails={
         examid:	$scope.examid,
         questype: $scope.quesForm.questype,
         question: $scope.quesForm.ques,
         answer:   $scope.quesForm.ansObj,
         options:  optArray,
         marks:    $scope.quesForm.marks
        };
        console.log(quesDetails);
     }
     else if($scope.quesForm.questype=="true-false"){
          ansArray.push($scope.quesForm.alterType);
          optArray.push("True");
          optArray.push("False");
          quesDetails={
         examid:	$scope.examid,
         questype: $scope.quesForm.questype,
         question: $scope.quesForm.ques,
         options:  ["True","False"],
         answer:   $scope.quesForm.alterType,
         marks:    $scope.quesForm.marks
         };
         console.log(quesDetails);
     }
     else if($scope.quesForm.questype=="multiselect"){


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
         var quesDetails={
         examid:	$scope.examid,
         questype: $scope.quesForm.questype,
         question: $scope.quesForm.ques,
         options:  optArray,
         answer:   ansArray,
         marks:    $scope.quesForm.marks
         };
         console.log(quesDetails);

       }
       console.log(ansArray.length,optArray.length);
       if(ansArray.length==0 || optArray.length<=1)
       {
         $scope.emsg="Plz select options/answer";

         return
       }else if($scope.quesForm.ques=="" ||  $scope.quesForm.marks=="" || $scope.quesForm.questype==""){
         $scope.emsg="Plz fill all fields";
         return
       }
       else{
         $scope.emsg="";
       $http.post('/question',quesDetails).then(function (response){
       $scope.examId=response.data
        console.log($scope.examId,"done with servefr");
        $scope.quesForm.ques="";
        $scope.quesForm.ansObj="";
        $scope.quesForm.optObjA="";
        $scope.quesForm.optObjB="";
        $scope.quesForm.optObjC="";
        $scope.quesForm.optObjD="";
        $scope.quesForm.alterType="";
        $scope.quesForm.ansMultiA="";
        $scope.quesForm.ansMultiB="";
        $scope.quesForm.ansMultiC="";
        $scope.quesForm.ansMultiD="";
        $scope.quesForm.optMultiA="";
        $scope.quesForm.optMultiB="";
        $scope.quesForm.optMultiC="";
        $scope.quesForm.optMultiD="";
        $scope.quesForm.marks="";
        var quesObj={};
         var optArray=[];
        var  ansArray=[];
       // window.location="/newexam.html#!/addque/:"+$scope.examId;
       },function (error){
       	console.log("question http error");
       })
     }
    };
    $scope.quesForm.Finish=function (){

     	console.log($scope.quesForm.questype);
     if($scope.quesForm.questype=="objective")
     {

       if($scope.quesForm.optObjA){
         optArray.push($scope.quesForm.optObjA);
       } if($scope.quesForm.optObjB){
         optArray.push($scope.quesForm.optObjB);
       } if($scope.quesForm.optObjC){
         optArray.push($scope.quesForm.optObjC);
       } if($scope.quesForm.optObjD){
         optArray.push($scope.quesForm.optObjD);
       }
       ansArray.push($scope.quesForm.ansObj);
     // console.log(optArray);
        quesDetails={
        examid:	$scope.examid,
        questype: $scope.quesForm.questype,
        question: $scope.quesForm.ques,
        answer:   $scope.quesForm.ansObj,
        options:  optArray,
        marks:    $scope.quesForm.marks
       };
       console.log(quesDetails);
    }
    else if($scope.quesForm.questype=="true-false"){
         ansArray.push($scope.quesForm.alterType);
         optArray.push("True");
         optArray.push("False");
         quesDetails={
        examid:	$scope.examid,
        questype: $scope.quesForm.questype,
        question: $scope.quesForm.ques,
        options:  ["True","False"],
        answer:   $scope.quesForm.alterType,
        marks:    $scope.quesForm.marks
        };
        console.log(quesDetails);
    }
    else if($scope.quesForm.questype=="multiselect"){


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
        var quesDetails={
        examid:	$scope.examid,
        questype: $scope.quesForm.questype,
        question: $scope.quesForm.ques,
        options:  optArray,
        answer:   ansArray,
        marks:    $scope.quesForm.marks
        };
        console.log(quesDetails);

      }
       if(ansArray.length==0 || optArray.length<=1)
       {
         $scope.emsg="Plz select options/answer";
         return
       }else if($scope.quesForm.ques=="" ||  $scope.quesForm.marks=="" || $scope.quesForm.questype==""){
         $scope.emsg="Plz fill all fields";
         return
       }
       else {
         $scope.emsg="";
       $http.post('/question',quesDetails).then(function (response){
        $scope.examid=response.data
        console.log($scope.examid,"client done server");
        window.location="/preview?examid="+$scope.examid;

       },function (error){
       	console.log("question http error");
      });
     }
    };
}]);


/*previewqQuestionPaper*/
/*var appPreview=angular.module('previewApp', []);
appPreview.controller('previewCtrl',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
  $scope.examid=$routeParams.examid;
  $http.get('/examDetails?examid='+$scope.examid).then(function(response){
    console.log("exams",response.data);

  },function(error){
    console.log("error in preview exam details http");
  });
$http.get('/questionsDetails?examid='+$scope.examid).then(function(response){
var questions=response.data;
console.log(questions);

},function (error){console.log("error in previre http questions")});

}]);
*/
/*end*/
