var express = require ( "express" );

//var userAuth = require ("../models/teacher");

//var UserAuth = new userAuth();

var teacher = {};

teacher.constructor = function(){
	console.log ("ok");
};
teacher.home=function(request,response) {
  res.sendFile(__dirname+"/view/teacher/index.html");  
}
