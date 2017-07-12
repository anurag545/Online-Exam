 var express=require('express');
var app=express();
var fs=require('fs');


var mongoose=require('mongoose');
 var User=require('./userSchema.js');
 mongoose.connect("mongodb://localhost:27017/onlineExam",{useMongoClient: true});

var path=require('path');
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
      console.log(req.file);
        var extArray = file.mimetype.split("/");
    var extension = extArray[extArray.length - 1];
    var filename=file.originalname+'-'+Date.now()+ "."+ extension;
    console.log(filename);
eventEmitter.emit('fileevent',{req:req,filename:filename});
    cb(null,filename);
   } 
});
var upload=multer({storage:storage});

app.use(express.static(__dirname));
 app.get('/',function(req,res){
  res.sendFile(__dirname + "/index.html");
 });
app.get('/loginpage',function(req,res){
res.sendFile(__dirname+"adminlogin.html");

});

 eventEmitter.on('fileevent',function (obj){
console.log(obj.filename);

var data=obj.req.body;
 //var filedata=obj.req.file;
 //console.log(filedata);
 var filename=obj.filename;
var userobj={
username:data.uname,
phone:data.phone,
email:data.email,
password:data.pwd,
address:data.address,
country:data.country,
gender:data.gender,
job:data.job,
birthdate:data.dob,
profilepic:filename
};


  console.log("Connected to DB");
  console.log(userobj);
  var  user=new User(userobj);
  user.save(function(err){
    if(err) throw err;
    mongoose.connection.close();
    eventEmitter.emit('success');
  });
});
 app.post('/signup',upload.single('profilepic'),function (req,res){
  console.log("Request in server");
  eventEmitter.on('success',function (){
  res.redirect('/loginpage');
 });
 });
 app.post('/login',function (req,res){
var data=req.body;


 })
 app.listen(8080);