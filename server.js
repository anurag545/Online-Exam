 var express=require('express');
var app=express();
var fs=require('fs');
var path=require('path');

var jsonwebtoken=require('jsonwebtoken');
var CONFIG=require('./config.js');
var TOKEN_SECRET=CONFIG.jwtSecret;
var auth=require('./loginsauth.js');

var mongoose=require('mongoose');
 var User=require('./userSchema.js');
 var Exam=require('./admin/js/examSchema.js');
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

/* eventEmitter.on('fileevent',function (obj){
//console.log(obj.filename);
var data=obj.req.body;
 //var filedata=obj.req.file;
 //console.log(filedata);
 var filename=obj.filename;





  eventEmitter.on('success',function (){
    console.log("helooo");
  //res.redirect('/loginpage');
 });*/

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
res.sendFile(__dirname+"/adminlogin.html");
});
 app.post('/login',function (req,res){
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
     var token=jsonwebtoken.sign({id:email,username:user[0].username},TOKEN_SECRET/*,{expiresIn:TOKEN_EXPIRES}*/);
     res.status(200).json({
      success:true,
      token:token
     });   
     }  
});

 });
 app.get('/home',auth.verifyToken,function(req,res){
res.sendFile(__dirname+"/admin/index.html");
});
 app.post('/examdetails',function (req,res){
  var data=req.body;
  console.log(data);
  var examObj={
    examname:data.examname,
    examdes:data.examdes,
    examdate:data.examdate,
    exammarks:data.exammarks,
    examtime:data.examtime,
    examdur:data.examdur
  };
  var exam=new Exam(examObj);
  console.log(examObj);
  exam.save(function(err,exam,numAffected){
    if(err)
      throw err
     if(numAffected){
    console.log("added",exam);
    res.send(exam._id);
     }
  });
 });
 app.listen(8080,function(){
    console.log("localhost at 8080");
 });