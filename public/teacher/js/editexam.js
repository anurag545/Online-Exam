var app = angular.module('examApp',['ngRoute']);
angular.bootstrap(document.getElementById('examForm'),['examApp']);
app.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/',{
     templateUrl : "../../../views/teacher/editexamdetail.html",
    //template : "<h1>Main Route 1</h1><p>Click on the links to change this content {{uid}}</p>",
    controller :'examCtrl'
  }).when('/editque/:examid/:tmarks',{
        templateUrl:"../../../views/teacher/editquestions.html",
        controller :'quesCtrl'
    })
}]);
app.controller('examCtrl',['$scope','$http','$log','$filter',function ($scope,$http,$log,$filter){
  var urlParams = new URLSearchParams(window.location.search);
  $scope.examid=urlParams.get('examid');
  console.log($scope.examid);

  $scope.examForm={};
  if($scope.examid){
  $http.get('/teacher/examDetails?examid='+$scope.examid).then(function(response){
  var exam=response.data;

  $scope.examForm.xname=exam.examName;

  $scope.examForm.xdes=exam.examDes;
   var date = new Date(exam.examStartDate);
  $scope.examForm.xdate = $filter('date')(date, 'yyyy-MM-dd  h:mm a');
  $scope.examForm.xdur=exam.examDur;
  var date2=new Date(exam.examEndDate);
  $scope.examForm.xenddate=$filter('date')(date2,'yyyy-MM-dd  h:mm a')
  $scope.examForm.xmarks=exam.examMarks;
},function(error){
  console.log(error,"error in examdetails");
});
}
var picker = new Pikaday(
     {
       field: document.getElementById('datepickeronly'),
       format: 'YYYY-MM-DD hh:mm A',
       firstDay: 1,
       minDate: new Date(),
      maxDate: new Date(2020, 12, 31),
      //setDefaultDate : true,
      showTime       : true,
      splitTimeView  : false,
      //showSeconds    : true,
      hours24format  : false
   });
   var picker = new Pikaday(
        {
          field: document.getElementById('enddatepickeronly'),
          format: 'YYYY-MM-DD hh:mm A',
          firstDay: 1,
          minDate: new Date(),
         maxDate: new Date(2020, 12, 31),
         //setDefaultDate : true,
         showTime       : true,
         splitTimeView  : false,
        // showSeconds    : true,
         hours24format  : false
      });
   $scope.caldur=function(){
     $scope.examForm.xdur="";
     if($scope.examForm.xdate &&$scope.examForm.xenddate ){
       function getDataDiff(startDate, endDate) {
           var diffDate = endDate.getTime() - startDate.getTime();
           if(diffDate<=0){
             return undefined;
           }
           var days = Math.floor(diffDate / (60 * 60 * 24 * 1000));
           var hours = Math.floor(diffDate / (60 * 60 * 1000)) - (days * 24);
           var minutes = Math.floor(diffDate / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
           //var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
           return { day: days, hour: hours, minute: minutes };
       }
        var diff= getDataDiff(new Date($scope.examForm.xdate), new Date($scope.examForm.xenddate));
        if(diff==undefined){
          document.getElementsByClassName("durerror")[0].style="border-color:#a94442";
          $scope.examForm.xdur="Not Valid";
        }else{
          document.getElementsByClassName("durerror")[0].style="border-color:#ccc";
             if(diff.day!="0"){

                if(diff.day=="1"){
                  $scope.examForm.xdur=diff.day+" day "
                }
                else {
                  $scope.examForm.xdur=diff.day+" days "
                }
             }
             if(diff.hour!="0"){
                if(diff.hour=="1"){
                  $scope.examForm.xdur=$scope.examForm.xdur+diff.hour+" hr "
                }
                else {
                  $scope.examForm.xdur=$scope.examForm.xdur+diff.hour+" hrs "
                }
             }
             if(diff.minute!="0"){
                if(diff.minute=="1"){
                  $scope.examForm.xdur=$scope.examForm.xdur+diff.minute+" min "
                }
                else {
                  $scope.examForm.xdur=$scope.examForm.xdur+diff.minute+" mins "
                }
             }

               //console.log($scope.examForm.xdur);
        }
     }
   }
 $scope.EditQuestions=function(){
   window.location="/teacher/editexam#!/editque/:"+$scope.examid+"/:"+$scope.examForm.xmarks;
 }
$scope.examForm.examSubmit=function (){
  if($scope.examForm.xdur!="Not Valid"){
var examObj={
    examid:$scope.examid,
    examname:$scope.examForm.xname,
    examdes:$scope.examForm.xdes,
    examstartdate:$scope.examForm.xdate,
    examenddate:$scope.examForm.xenddate,
    examdur:$scope.examForm.xdur,
    exammarks:$scope.examForm.xmarks
    };
  console.log(examObj);

$http.post('/teacher/updateexam?examid='+$scope.examid,examObj).then(function(response){
  window.location="/teacher/editexam#!/editque/:"+$scope.examid+"/:"+$scope.examForm.xmarks;
},function(error){
 console.log("error in xam http");
});
}
}
}]);

/*      ********************************   Question Controller  ****************************************************     */

 app.controller('quesCtrl',['$scope','$routeParams','$http','$log','$filter','$location', '$anchorScroll',function ($scope,$routeParams,$http,$log,$filter,$location,$anchorScroll){

  $scope.showques=function (){
         document.getElementById("newques").style.display="block";
         document.getElementById("newbtn").style="display:none;";
          document.getElementById("prev").style="display:none;";
         document.getElementById("done").style="display:block;";
    }


  $scope.done=function (){
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
    $scope.count1=$scope.count;
    var quesObj={};
     var optArray=[];
    var  ansArray=[];
      $scope.A="B";
      $scope.B="C";
      $scope.C="D";
      $scope.D="A";
      $scope.objective="dddsc";
      $scope.truefalse="scsdc";
      $scope.multiselect="csdcdsc";
      $scope.True="dsc";
      $scope.False="jjh";
      document.getElementById('hidden_div_objective').style.display = "none";
      document.getElementById('hidden_div_truefalse').style.display = "none";
      document.getElementById('hidden_div_multiselect').style.display = "none";
      document.getElementById("newques").style="display:none;";
      document.getElementById("newbtn").style="display:block";
      document.getElementById("prev").style="display:block";
      document.getElementById("done").style="display:none";
      document.getElementById("updatebtn").style="display:none";
      document.getElementById("addbtn").style="display:block";
  }



  var idArray=$routeParams.examid.split(':');
  var tmarksArray=$routeParams.tmarks.split(':');
  $scope.examid=idArray[1];
  $scope.tmarks=tmarksArray[1];
  $scope.exam={};
  $scope.questions={};
  $scope.quesid="";
  //console.log($scope.examid);
   $scope.count=parseInt(0);
  $http.get('/teacher/questionsDetails?examid='+$scope.examid).then(function(response){
  $scope.questions=response.data;
  $scope.quesno=$scope.questions.length;
  for(i=0;i<$scope.questions.length;i++){
    $scope.count=$scope.count+$scope.questions[i].quesMarks;
  }
  //console.log("questions",$scope.questions);
  },function (error){console.log("error in previre http questions")});
   $scope.optionArr=["A","B","C","D"];


   $scope.Remove=function (quesid){
     var quesid={
       quesid:quesid
     }
     $http.post('/teacher/deleteQues',quesid).then(function(response){
       console.log(response.data);
       var ques=response.data;
       var foundques = $filter("filter")($scope.questions, {_id:ques.quesid}, true)[0];
        var index=$scope.questions.indexOf(foundques);
        $scope.questions.splice(index,1);
        $scope.quesno=$scope.quesno-parseInt(1);
        $scope.count=$scope.count-ques.quesMark;
     });
   }



    $scope.showDiv =function (elem){
        console.log("ok",elem);
        if(elem == 'objective')
        {
        document.getElementById('hidden_div_objective').style.display = "block";
        document.getElementById('hidden_div_truefalse').style.display = "none";
        document.getElementById('hidden_div_multiselect').style.display = "none";
        }
        else if(elem=='true-false')
        {
        document.getElementById('hidden_div_truefalse').style.display = "block";
        document.getElementById('hidden_div_objective').style.display = "none";
        document.getElementById('hidden_div_multiselect').style.display = "none";
        }
        else if(elem=='multiselect')
        {
        document.getElementById('hidden_div_multiselect').style.display = "block";
        document.getElementById('hidden_div_objective').style.display = "none";
        document.getElementById('hidden_div_truefalse').style.display = "none";
        }
        }

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


   $scope.Edit=function(questid){
       $scope.quesid=questid;
       document.getElementById("newques").style.display="block";
       var foundques = $filter("filter")($scope.questions, {_id:questid}, true)[0];
       var index=$scope.questions.indexOf(foundques);
       $scope.quesForm.ques=$scope.questions[index].quesName;
      // console.log($scope.quesForm.ques);
       $scope.quesForm.questype=$scope.questions[index].quesType;
       $scope.quesForm.marks=$scope.questions[index].quesMarks;
      // console.log( $scope.quesForm.questype);
       //$scope.objective="objective";
       $scope.showDiv($scope.quesForm.questype);
       if($scope.quesForm.questype=="objective"){
            //$scope.objective="objective";
            $scope.quesForm.ansObj=$scope.questions[index].quesAnswer[0];

            if($scope.questions[index].quesOptions.length==1){
              $scope.quesForm.optObjA=$scope.questions[index].quesOptions[0];
            }else if($scope.questions[index].quesOptions.length==2){
              $scope.quesForm.optObjA=$scope.questions[index].quesOptions[0];
              $scope.quesForm.optObjB=$scope.questions[index].quesOptions[1];
            }else if($scope.questions[index].quesOptions.length==3){
              $scope.quesForm.optObjA=$scope.questions[index].quesOptions[0];
              $scope.quesForm.optObjB=$scope.questions[index].quesOptions[1];
              $scope.quesForm.optObjC=$scope.questions[index].quesOptions[2];
            }else if($scope.questions[index].quesOptions.length==4){
              $scope.quesForm.optObjA=$scope.questions[index].quesOptions[0];
              $scope.quesForm.optObjB=$scope.questions[index].quesOptions[1];
              $scope.quesForm.optObjC=$scope.questions[index].quesOptions[2];
              $scope.quesForm.optObjD=$scope.questions[index].quesOptions[3];
            }
        }
        else if($scope.quesForm.questype=="true-false"){
              //$scope.truefalse="truefalse";
              $scope.quesForm.alterType=$scope.questions[index].quesAnswer[0];
            /*  if($scope.quesForm.alterType=='True'){
                $scope.True="True";

              }else if($scope.quesForm.alterType=='False'){
                      $scope.False="False";
                  }*/
        }
        else if($scope.quesForm.questype=="multiselect"){
            //$scope.multiselect="multiselect";
            for(i=0;i<$scope.questions[index].quesAnswer.length;i++){
                $scope.ans=$scope.questions[index].quesAnswer[i];
                 //console.log($scope.ans);
                if($scope.ans=='A'){
                   //console.log($scope.ans);
                  // $scope.A='A';
                $scope.quesForm.ansMultiA=$scope.ans;
                console.log($scope.quesForm.ansMultiA)
                }
                if($scope.ans=='B'){
                //  $scope.B='B';
                $scope.quesForm.ansMultiB=$scope.ans;
                }
                if($scope.ans=='C'){
                //  $scope.C='C';
                $scope.quesForm.ansMultiC=$scope.ans;
                }
                if($scope.ans=='D'){
                //  $scope.D='D';
                $scope.quesForm.ansMultiD=$scope.ans;
                }
            }

            if($scope.questions[index].quesOptions.length==1){
              $scope.quesForm.optMultiA=$scope.questions[index].quesOptions[0];
            }else if($scope.questions[index].quesOptions.length==2){
              $scope.quesForm.optMultiA=$scope.questions[index].quesOptions[0];
              $scope.quesForm.optMultiB=$scope.questions[index].quesOptions[1];
            }else if($scope.questions[index].quesOptions.length==3){
              $scope.quesForm.optMultiA=$scope.questions[index].quesOptions[0];
              $scope.quesForm.optMultiB=$scope.questions[index].quesOptions[1];
              $scope.quesForm.optMultiC=$scope.questions[index].quesOptions[2];
            }else if($scope.questions[index].quesOptions.length==4){
              $scope.quesForm.optMultiA=$scope.questions[index].quesOptions[0];
              $scope.quesForm.optMultiB=$scope.questions[index].quesOptions[1];
              $scope.quesForm.optMultiC=$scope.questions[index].quesOptions[2];
              $scope.quesForm.optMultiD=$scope.questions[index].quesOptions[3];
            }
        }
           document.getElementById("newbtn").style="display:none;";
           document.getElementById("prev").style="display:none;";
           document.getElementById("done").style="display:block;";
           document.getElementById("addbtn").style="display:none;"
           document.getElementById("updatebtn").style="display:block;"

           $location.hash('minput');
           $anchorScroll();
   }



   $scope.Preview=function(){
    window.location="/teacher/preview?examid="+$scope.examid;
    }



    $scope.Update=function(){
  //    var foundques = $filter("filter")($scope.questions, {_id:$scope.quesid}, true)[0];
      //var index=$scope.questions.indexOf(foundques);
      //$scope.quesForm.ques=$scope.questions[index].quesName;
      //console.log($scope.quesForm.ques);
          //  $scope.quesForm.questype=$scope.questions[index].quesType;
          console.log($scope.quesid);
           console.log($scope.quesForm);
          //  console.log($scope.quesForm.questype ,$scope.quesForm.ques,$scope.quesForm.marks,)
            if($scope.quesForm.questype && $scope.quesForm.ques)
            {
             //console.log($scope.quesForm.questype);
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
                quesid:$scope.quesid,
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
                quesid:$scope.quesid,
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
                 console.log($scope.quesForm.ansMultiA);
                ansArray.push("A");
               } if($scope.quesForm.ansMultiB){
                 console.log($scope.quesForm.ansMultiB);
                ansArray.push("B");
               } if($scope.quesForm.ansMultiC){
                ansArray.push("C");
               } if($scope.quesForm.ansMultiD){
                ansArray.push("D");
               }
                console.log(optArray,ansArray);
                var quesDetails={
                quesid:$scope.quesid,
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
               $scope.count=$scope.count+parseInt($scope.quesForm.marks);
              // console.log($scope.count);
               if($scope.count<=$scope.tmarks){
              $http.post('/teacher/updatequestion?quesid='+$scope.quesid,quesDetails).then(function (response){
               $scope.ques=response.data;
               console.log($scope.ques,"done with server");
               var foundques = $filter("filter")($scope.questions, {_id:$scope.quesid}, true)[0];
               var index=$scope.questions.indexOf(foundques);
               $scope.questions.splice(index,1,$scope.ques);
               //$scope.questions.push($scope.ques);
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
               $scope.count1=$scope.count;
               var quesObj={};
                var optArray=[];
               var  ansArray=[];
               $scope.A="B";
               $scope.B="C";
               $scope.C="D";
               $scope.D="A";
               $scope.objective="dddsc";
               $scope.truefalse="scsdc";
               $scope.multiselect="csdcdsc";
               $scope.True="dsc";
               $scope.False="jjh";
              // window.location="/newexam.html#!/addque/:"+$scope.examId;
              },function (error){
                console.log("question http error");
              })
            }
            else{
              $scope.emsg="Limit Exceeds of Marks (must less than total marks)";
              $scope.count=$scope.count-parseInt($scope.quesForm.marks);
            //  console.log($scope.count);
            }
          }
         }else{
           $scope.emsg="Plz fill Required fields";
         }
       };
    $scope.quesForm.saveContinue=function (){
     if($scope.quesForm.questype && $scope.quesForm.ques)
     {
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
          console.log($scope.quesForm.ansMultiA);
        	ansArray.push("A");
        } if($scope.quesForm.ansMultiB){
          console.log($scope.quesForm.ansMultiB);
        	ansArray.push("B");
        } if($scope.quesForm.ansMultiC){
        	ansArray.push("C");
        } if($scope.quesForm.ansMultiD){
        	ansArray.push("D");
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
        $scope.count=$scope.count+parseInt($scope.quesForm.marks);
        console.log($scope.count);
        if($scope.count<=$scope.tmarks){
       $http.post('/teacher/addquestion',quesDetails).then(function (response){
        $scope.ques=response.data;
        console.log($scope.ques,"done with server");
      //  $scope.count=$scope.count+parseInt($scope.ques.quesMarks);
        $scope.quesno=$scope.quesno+1;
        $scope.questions.push($scope.ques);
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
        $scope.count1=$scope.count;
        var quesObj={};
         var optArray=[];
        var  ansArray=[];
       // window.location="/newexam.html#!/addque/:"+$scope.examId;
       },function (error){
       	console.log("question http error");
       })
     }
     else{
       $scope.emsg="Limit Exceeds of Marks (must less than total marks)";
       $scope.count=$scope.count-parseInt($scope.quesForm.marks);
       console.log($scope.count);
     }
   }
  }else{
    $scope.emsg="Plz fill Required fields";
  }
  };

}]);
/*
angular.element(document).ready(function() {
  // angular.bootstrap(document.getElementById("mainDash"), ['mainApp']);
   angular.bootstrap(document.getElementById("makeExam"), ['examApp']);
});

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
