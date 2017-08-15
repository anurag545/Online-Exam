var mongoose=require('mongoose');
var User=require('../schemas/userSchema.js');
var Exam=require('../schemas/examSchema.js');
var Question=require('../schemas/quesSchema.js');
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
      console.log(users);
      callback(users);
      });
    }
}
module.exports=TeacherAuth
