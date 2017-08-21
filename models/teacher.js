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
      //console.log(examObj);
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
      Exam.findById(data, function(err,exam) {
      if (err) throw err;
      //console.log(exam);
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

    this.getgroups=function(callback){
      Group.find({}, function(err,groups) {
      if (err) throw err;
      //console.log(questions);
      callback(groups);
    });
    }

    this.getexams=function(callback){

      Exam.find({},'examName examDate groupId',function(err,exams){
            if(err) throw err;
           console.log(exams);
            for(var i = 0;i< exams.length || function(){ callback(exams)}();i++) {
          var groupsName=[];
           for(var j=0;j<exams[i].groupId.length||function (){
            console.log(groupsName);
         exams[i].groupsName=groupsName;
       }();j++){
             //console.log(exams[i].groupId[j]);
              Group.findById(exams[i].groupId[j],'groupName',function (err,group){
                if(err) throw err
               console.log(group.groupName,"group");
                groupsName.push(group.groupName);

              });
           }
            console.log(groupsName);
           exams[i].groupName=groupsName;
         }
      });
    }

    this.deleteExam=function(data,callback){
      //console.log(data,"model");
      Exam.findOneAndRemove({examName:data}, function (err, exam) {
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
      Group.findOneAndRemove({groupName:data}, function (err,group){
          console.log(group,group._id);
      var groupid = group._id;
        if (err) throw err
          Exam.find({ groupId: { $all  : groupid }},'groupId' ,function (err,groupsid) {
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
          });
    });
    }
    this.addGroupId=function(data,callback){
      console.log(data,"model");
      Exam.findByIdAndUpdate(data.examId, { $push: { groupId:data.groupIds }}, { new: true }, function (err,exam) {
         if (err) throw err;
          console.log(exam);
          callback();
         });

    }
}
module.exports=TeacherAuth
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
