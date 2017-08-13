var mongoose=require('mongoose');
var User=require('../schemas/userSchema.js');
var Exam=require('../schemas/examSchema.js');
var Question=require('../schemas/quesSchema.js');
 mongoose.connect("mongodb://localhost:27017/onlineExam",{useMongoClient: true});
 function studentAuth(){

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
}
module.exports=studentAuth
