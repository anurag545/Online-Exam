var mongoose=require('mongoose');
var User=require('../schemas/userSchema.js');
var Exam=require('../schemas/examSchema.js');
var Question=require('../schemas/quesSchema.js');
var Group=require('../schemas/groupSchema.js');
 mongoose.connect("mongodb://localhost:27017/onlineExam",{useMongoClient: true});

 function TeacherAuth(){

   this.signInWithUserNameAndPassword=function (data,callback){
        User.find({ email:data.username ,password:data.password}, function(err, user) {
           if (err) throw err;
             //console.log(user,"user");
            callback(user);
          });
   }

   this.profileDetails=function (data,callback){
       User.find({email:data.id}, function(err,userProfile) {
       if (err) throw err;
       //console.log(userProfile);
       callback(userProfile);
       });
   }

    this.examDetails=function(data,callback){
        var exam=new Exam(data);
        //console.log(data);
        exam.save(function(err,exam,numAffected){
          if(err)
            throw err
           if(numAffected){
         // console.log("added",exam);
            callback(exam._id);
           }
        });
    }

    this.question=function(data,callback){
        var question=new Question(data);
        question.save(function (err,question,numAffected){
            if (err) throw err
                if(numAffected){
                    //console.log(question.examId,"in");
                   // var mark=(question.quesMarks).toString();
                    callback(question.examId);
                }
        });
    }

    this.examInfo=function(data,callback){
        console.log(data,"data");
        Exam.findById(data, function(err,exam) {
        if (err) throw err;
        console.log(exam);
        callback(exam);
        });
    }

    this.quesInfo=function(data,callback){
        Question.find({ examId:data}, function(err,questions) {
        if (err) throw err;
        //console.log(questions);
        callback(questions);
        });
    }

    this.getuser=function(data,callback){
        User.find({email:{ $regex: data + '.*' }}, function(err,users) {
        if (err) throw err;
        //console.log(users);
        callback(users);
        });
    }

    this.addgroup=function(data,callback){
        var group=new Group({
         userEmail:data.userEmail,
         groupName:data.groupName,
         usersEmail:data.usersEmail,
         examsId:data.examId
       });
       console.log(group,"model");
       group.save(function (err,group,numAffected){
           if (err) throw err
               if(numAffected){
                    if(data.examId){
                     console.log(group._id,"groupid",group,data.examId);
                     Exam.findByIdAndUpdate(data.examId, { $push: { groupId:group._id }}, { new: true }, function (err, exam) {
                        if (err) throw err;
                         console.log(exam);
                         callback(group);
                        });
                      }
                      else{
                        callback(group);
                      }
               }
       });
    }

    this.getgroups=function(data,callback){
      //console.log(data.name,data,data.userid);
     Group.find({userEmail:data}, function(err,groups) {
      if (err) throw err;
      console.log(groups);
      if(groups){
      callback(groups);
       }
    });
    }

    this.getexams=function(data,callback1){
        Exam.find({userEmail:data},'examName examStartDate examDur groupId',function(err,exams){
              if(err) throw err;
              //console.log(exams);
              var groupsName=[];
              function asyncLoop( i, callback ) {
                  if( i < exams.length ) {
                        console.log(i)
                          Group.find({_id:{$in:exams[i].groupId}},'groupName', function(err,groupName){
                             if (err) throw err;
                                console.log(groupName,"gn");
                                groupsName.push(groupName);
                                console.log(groupsName,"inside");
                                asyncLoop(i+1,callback);
                           });
                    } else {
                      var obj={
                        exams:exams,
                        groups:groupsName
                        }
                        callback(obj);
                      }
                  }
                  asyncLoop( 0, function(obj){
                        console.log(obj)
                        callback1(obj);
                   });
          });
    }

    this.deleteExam=function(data,callback){
        Exam.findByIdAndRemove(data, function (err, exam) {
             //console.log(exam)
             if(err) throw (err);
             Question.remove({examId:exam._id}, function (err, writeOpResult) {
                    //console.log(writeOpResult);
                    if(err) throw err;
                    callback(exam.examName);
                });
         });
    }

    this.deleteGroup=function(data,callback){
        console.log(data,"model");
        Group.findByIdAndRemove(data, function (err,group){
            console.log(group,group._id,"group");
          if (err) throw err
             Exam.update({groupId:{$in:[group._id]}},{$pull:{groupId:group._id}},{multi:true},function(err,exam){
               console.log(exam,"exam");
               callback(group);
             });
        });
    }

    this.addGroupId=function(data,callback){
        console.log(data,"model");
        Exam.findByIdAndUpdate(data.examId, { $push: { groupId:data.groupId}}, { new: true }, function (err,exam) {
           if (err) throw err;
            console.log(exam);
            callback();
           });
    }

    this.getgroup=function(data,callback){
        Group.findById(data,'groupName usersEmail',function(err,group){
          if(err) throw err;
          //console.log(group);
            User.find({email:{$in:group.usersEmail}},'username email phone',function(err,user){
              var groupData={
                groupdata:group,
                userdata:user
              }
              console.log(groupData);
              callback(groupData);
            });
        });
    }

    this.updategroup=function(data,callback){
        Group.findByIdAndUpdate(data.groupId, {groupName:data.groupName,usersEmail:data.usersEmail}, { new: true }, function (err,group) {
           if (err) throw err;
            console.log(group);
            callback();
           });
    }

    this.updateexam=function(data,callback){
      var  examObj={
        examName:data.examName,
        examDes:data.examDes,
        examStartDate:data.examStartDate,
        examEndDate:data.examEndDate,
        examDur:data.examDur,
        examMarks:data.examMarks
      }
        Exam.findByIdAndUpdate(data.examId,examObj, { new: true }, function (err,exam) {
           if (err) throw err;
            console.log(exam);
            callback();
           });
    }

    this.deleteQues=function(data,callback){
        Question.findByIdAndRemove(data, function (err, ques) {
             //console.log(exam)
             if(err) throw (err);
             var quesObj={
               quesid:ques._id,
               quesMark:ques.quesMarks
             }
             console.log(quesObj);
               callback(quesObj);
         });
    }
}

module.exports=TeacherAuth
//console.log(exams);
//for(var i = 0;i< exams.length;i++) {
// var groupsName=[];
// console.log(exams[i].groupId.length,"groupId")
/*/           var groupsName = [];
exams.forEach(function(u){
   //console.log(u,"u");
Group.findById({$in:u.groupId},'groupName', function(err,groupName){
if (err) throw err;
   console.log(groupName,"gn");
   groupsName.push(groupName)
});
console.log(groupsName,"gpsnm");
});
  /*Group.findById({$in:exams},'groupName',function(err,group){
    if(err) throw err;
    console.log(group,"group");
    callback(exams)
  });

/* for(var j=0;j<exams[i].groupId.length||function (){
console.log(groupsName);
exams[i].groupsName=groupsName;
}();j++){
 //console.log(exams[i].groupId[j]);
  Group.findById(exams[i].groupId[j],'groupName',function (err,group){
    if(err) throw err
   console.log(group.groupName,"group");
    groupsName.push(group.groupName);

  });
}*/
//console.log(groupsName);
//exams[i].groupName=groupsName;
//}
/*
 Exam.find({},'examName examDate groupId',function(err,exams){
   if(err) throw err;
 //  console.log(exams);
    for(var key1 in exams){
      var groupsName=[];
     //console.log(exams[key1].groupId.length,"groupId")
       for(var i=0;i<exams[key1].groupId.length;i++){
         //console.log(exams[key1].groupId[i]);
          Group.findById(exams[key1].groupId[i],'groupName',function (err,group){
            if(err) throw err
            console.log(group.groupName,"group");
            groupsName.push(group.groupName);
          });
       }.then(function(){
           console.log(groupsName);
           exams[key1].groupsName=groupsName;
       });

    }.then(function(){
          callback(exams);
    });
 });*/

         // console.log(exams[i].groupId.length,"groupId")
         /*
         exams[i].groupId.forEach(function(u,i){
            //var users = [];
            console.log(u);
     Group.findById(u,'groupName', function(err,groupName){
         if (err) throw err;
            console.log(groupName);
            groupsName.push(groupName);
       });
       console.log(groupsName);
     });*/
     /*    Exam.find({ groupId: { $all  : groupid }},'groupId' ,function (err,groupsid) {
           console.log(groupsid);
           if(groupsid){
             if(err) throw err
           for(var i;i<groupsid.length|| function(){
             console.log(groupsid[i]);
             //var exam=new Exam(exams[i]);
             //exam.save(function(err,exam) {
               //console.log(exam);
               callback(group)
           // });
          }();i++){
             groupsid[i].groupId.pull(new ObjectId(groupid));
             console.log(groupsid);
           }
          }
        });*/
