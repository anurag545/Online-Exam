 var express=require('express');
var app=express();
var fs=require('fs');
var path=require('path');
var bodyParser=require('body-parser');
app.use(bodyParser.json({strict:false}));
app.use(bodyParser.urlencoded({extended:false}));
 var User=require(./user.js);


 app.get('/',function(req,res){
  res.sendFile(__dirname + "/index.html");
 });