 var express=require('express');
var app=express();
var fs=require('fs');
var path=require('path');

var cookieParser = require('cookie-parser');
app.use(cookieParser());
//var Cookies=require('cookies');
var jsonwebtoken=require('jsonwebtoken');
var CONFIG=require('./config.js');
var TOKEN_SECRET=CONFIG.jwtSecret;
var auth=require('./loginsauth.js');
var UserClass=require('./model/user.js');
var UserC=new UserClass();
var mongoose=require('mongoose');
 var User=require('./userSchema.js');
 var Exam=require('./admin/js/examSchema.js');
  var Question=require('./admin/js/quesSchema.js');
 mongoose.connect("mongodb://localhost:27017/onlineExam",{useMongoClient: true});

var bodyParser=require('body-parser');
app.use(bodyParser.json({strict:false}));
app.use(bodyParser.urlencoded({extended:false}));

var events=require('events');
var eventEmitter=new events.EventEmitter();

var multer=require('multer');
var storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,__dirname +"/uploads");},
   filename:function(req,file,cb){
        var extArray = file.mimetype.split("/");
    var extension = extArray[extArray.length - 1];
    var filename=file.originalname+'-'+Date.now()+ "."+ extension;
     req.body.profilePicName=filename;
//eventEmitter.emit('fileevent',{req:req,filename:filename});
    cb(null,filename);
   }
});
var upload=multer({storage:storage});


app.use(express.static(__dirname));
app.use(express.static(__dirname+"/admin"));
 app.get('/',function(req,res){
  res.sendFile(__dirname + "/index.html");
 });

 app.post('/signup',upload.single('profilepic'),function (req,res){
  //console.log("Request in server");
  var data=req.body;
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
   //  mongoose.connection.close();
   if(numAffected){
   //console.log("db done");
    res.status(200).send();
    }
  });
});

 app.get('/loginpage',function(req,res){
   console.log(res.cookies);
res.sendFile(__dirname+"/adminlogin.html");
});
app.post('/login',function (req,res){
var data=req.body;
var user=[];
UserC.Login(data,function(user){
//console.log(user);
if(user.length=="0"){
   var obj={
     err:{
       errmsg:"Invalid UserName/password"
     }
   }
   res.send(obj);

 }else if(user.length!="0"){
   email=user[0].email;
  var token=jsonwebtoken.sign({id:email,username:user[0].username},TOKEN_SECRET/*,{expiresIn:TOKEN_EXPIRES}*/);
  res.cookie('token',token).sendStatus(200);
}
});
});
 /*app.post('/login',function (req,res){
var data=req.body;
//console.log(data,"data");
 User.find({ email:data.username ,password:data.password}, function(err, user) {
  if (err) throw err;
  //console.log(user);
     if(user.length==0){
      var obj={
        err:{
          errmsg:"Invalid UserName/password"
        }
      }
      res.send(obj);

     }else{
    //  console.log("avaialble");
      email=user[0].email;
      //console.log(email,user);
     var token=jsonwebtoken.sign({id:email,username:user[0].username},TOKEN_SECRET/*,{expiresIn:TOKEN_EXPIRES});
     //var cookies=new Cookies (req,res);
     //cookies.set("token",token);
     res.cookie('token',token).sendStatus(200);
   }
 });
 });*/
 app.get('/home',auth.verifyToken,function(req,res){
res.sendFile(__dirname+"/admin/index.html");
});
app.get('/profile',auth.verifyToken,function(req,res){
res.sendFile(__dirname+"/admin/profile.html");
});
app.get('/name',auth.verifyToken,function(req,res){
    var payloadData=auth.getUserIdNameFromToken;
    var data=payloadData(req);
    res.send(data.username);
});
app.get('/profileDetails',auth.verifyToken,function (req,res){
  var payloadData=auth.getUserIdNameFromToken;
  var  data=payloadData(req);
  User.find({email:data.id}, function(err,userProfile) {
  if (err) throw err;
  console.log(userProfile);
  res.send(userProfile);
});
});
 app.post('/examdetails',auth.verifyToken,function (req,res){
    var data=req.body;
 // console.log(data);
    var examObj={
    examName:data.examname,
    examDes:data.examdes,
    examDate:data.examdate,
    examMarks:data.exammarks,
    examTime:data.examtime,
    examDur:data.examdur
  };
  var exam=new Exam(examObj);
  //console.log(examObj);
  exam.save(function(err,exam,numAffected){
    if(err)
      throw err
     if(numAffected){
   // console.log("added",exam);
    res.send(eauth.verifyToken,xam._id);
     }
  });
 });

app.post('/question',auth.verifyToken,function (req,res){
var data=req.body;
//console.log(data);
var quesObj={
    examId:data.examid,
    quesType:data.questype,
    quesName:data.question,
    quesOptions:data.options,
    quesAnswer:data.answer,
    quesMarks:data.marks
};
console.log(quesObj,"server data");
var question=new Question(quesObj);
question.save(function (err,question,numAffected){
    if (err) throw err
        if(numAffected){
            console.log(question.examId,"in");
           // var mark=(question.quesMarks).toString();
            res.send(question.examId);
        }
});
});
app.get('/preview',auth.verifyToken,function (req,res){
  res.sendFile(__dirname+"/admin/previewexam.html");
});
app.get('/examDetails',auth.verifyToken,auth.verifyToken,function(req,res){
  var examid=req.query.examid;
  //console.log(examid);
  Exam.findById(examid, function(err,exam) {
  if (err) throw err;
  //console.log(exam);
  res.send(exam);
});
});
app.get('/questionsDetails',auth.verifyToken,function (req,res){
  var examid=req.query.examid;
  Question.find({ examId: examid }, function(err,questions) {
  if (err) throw err;
  console.log(questions);
  res.send(questions);
});
});
app.get('/logout',auth.verifyToken,function (req,res){
    //var token1=req.cookies.token;
    res.clearCookie('token',{path:'/'});
    //console.log(req.cookies,"2");
    res.sendStatus(200);
});
 app.listen(8080,function(){
    console.log("localhost at 8080");
 });
