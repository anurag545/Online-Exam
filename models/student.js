var mongoose=require('mongoose');
var User=require('../schemas/userSchema.js');
 mongoose.connect(process.env.MONGODB_URI||"mongodb://localhost:27017/onlineExam",{useMongoClient: true});
 function StudentAuth(){

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
module.exports=StudentAuth
