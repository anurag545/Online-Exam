var mongoose=require('mongoose');
 var User=require('../schemas/userSchema.js');
 //var Exam=require('../admin/js/examSchema.js');
  //var Question=require('../admin/js/quesSchema.js');
 mongoose.connect(process.env.MONGODB_URI||"mongodb://localhost:27017/onlineExam",{useMongoClient: true});

function UserAuth(){
  this.signInWithUserNameAndPassword=function (data,callback){
   User.find({ email:data.username ,password:data.password}, function(err, user) {
      if (err) throw err;
       callback(user);
     });
  }
  this.signupdata=function (data,callback){
        var userObj={
               username:data.uname,
               phone:data.phone,
               email:data.email,
               password:data.pwd,
               address:data.address,
               country:data.country,
               gender:data.gender,
               job:data.job,
               birthdate:data.dob,
               profilepic:data.profilePicName
           };
           //console.log(userObj,"model");
           //console.log(data.client);
             var  user=new User(userObj);
               user.save(function(err,numAffected){
                var Obj={
                  numAffected:numAffected,
                  error:err
                };
               //if(err) {
                //callback(err);
               //}
              
               callback(Obj);
             });
    }
}
/*var mongoose=require('mongoose');
 var User=require('../userSchema.js');
 var Exam=require('../admin/js/examSchema.js');
  var Question=require('../admin/js/quesSchema.js');
 mongoose.connect("mongodb://localhost:27017/onlineExam",{useMongoClient: true});
function User(){
  this.name="Anurag",
  this.Login=function (body){
   var username=body.username;
    var email=body.email;
    User.find({ email:data.username ,password:data.password}, function(err, user) {
     if (err) throw err;
     //console.log(user);
        if(user.length==0){
          return false;
         /*var obj={
           err:{
             errmsg:"Invalid UserName/password"
           }
         }
         res.send(obj);

        }else{
          return user;
       //  console.log("avaialble");
         /*email=user[0].email;
         //console.log(email,user);
        var token=jsonwebtoken.sign({id:email,username:user[0].username},TOKEN_SECRET,{expiresIn:TOKEN_EXPIRES});
        //var cookies=new Cookies (req,res);
        //cookies.set("token",token);
        res.cookie('token',token).sendStatus(200);
      }
    });
 }

}

 funct
 User.prototype.Login = function () {

};
var  user={};

    user.Login=function (body){
     var username=body.username;
      var email=body.email;
      User.find({ email:data.username ,password:data.password}, function(err, user) {
       if (err) throw err;
       //console.log(user);
          if(user.length==0){
            return false;
           var obj={
             err:{
               errmsg:"Invalid UserName/password"
             }
           }
           res.send(obj);
          }else{
            return user;
         //  console.log("avaialble");
           email=user[0].email;
           //console.log(email,user);
          var token=jsonwebtoken.sign({id:email,username:user[0].username},TOKEN_SECRET,{expiresIn:TOKEN_EXPIRES});
          //var cookies=new Cookies (req,res);
          //cookies.set("token",token);
          res.cookie('token',token).sendStatus(200);
        }
      });
   }

user.SignUp=(data)=>{
    var userObj={
           username:data.uname,
           phone:data.phone,
           email:data.email,
           password:data.pwd,
           address:data.address,
           country:data.country,
           gender:data.gender,
           job:data.job,
           birthdate:data.dob,
           profilepic:data.profilePicName
       };

   console.log("Connected to DB");
     //console.log(userObj);
     var  user=new User(userObj);
     user.save(function(err,numAffected){
       if(err) throw err;
      return numAffected;
   });
 }

*/
module.exports= UserAuth
