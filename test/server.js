var express=require('express');
var app=express();
var User=require('./test');
var newuser=new User();
console.log(newuser.Login("AnuragThakur"));
app.listen(8080,function(){
  console.log("localhost:8080");
});
