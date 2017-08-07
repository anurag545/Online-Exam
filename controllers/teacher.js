var express = require ( "express" );
var path=require("path");
//var userAuth = require ("../models/teacher");

//var UserAuth = new userAuth();

var teacherC = {};

teacherC.constructor = function(){
	console.log ("ok");
};
teacherC.home=function(request,response) {
  response.sendFile(path.resolve(__dirname+"/../views/teacher/index.html"));
}
teacherC.newexam=function(request,response) {
	console.log("teachercon");
  response.sendFile(path.resolve(__dirname+"/../views/teacher/newexam.html"));
}
module.exports=teacherC
