var express = require ( "express" );
var app=express();
var path=require("path");

var jsonwebtoken=require('jsonwebtoken');
var CONFIG=require('../config/config.js');
var TOKEN_SECRET=CONFIG.jwtSecret;
var auth=require('../config/loginsauth.js');

var studentAuth = require ("../models/student");
var studentAuth = new studentAuth ();
//app.use(express.static(__dirname+"/public/student"));
var studentController = {};

studentController.constructor = function(){
	console.log ("ok");
};
studentController.login=function(request,response){
	  console.log(__dirname);
		response.sendFile(path.resolve(__dirname+"/../views/student/studentlogin.html"));
}
studentController.studentlogin=function (request,response){
	 var data=request.body;
	 var user=[];
	 studentAuth.signInWithUserNameAndPassword(data,function(user){
			//console.log(user);
			if(user.length=="0"){
			   var obj={
			     err:{
			       errmsg:"Invalid UserName/password"
			     }
			   }
			   response.send(obj);

			 }else if(user.length!="0"){
			   email=user[0].email;
			  var token=jsonwebtoken.sign({id:email,username:user[0].username,user:"student"},TOKEN_SECRET/*,{expiresIn:TOKEN_EXPIRES}*/);
				//console.log(token);
			  response.cookie('token',token).sendStatus(200);
			}
	});
}
studentController.logout=function(request,response){
	//var token1=req.cookies.token;
	response.clearCookie('token',{path:'/'});
	//console.log(req.cookies,"2");
	response.sendStatus(200);
}
module.exports=studentController
