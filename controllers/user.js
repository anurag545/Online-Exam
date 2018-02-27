var express = require ( "express" );
var path=require('path');

var jsonwebtoken=require('jsonwebtoken');
var CONFIG=require('../config/config.js');
var TOKEN_SECRET=CONFIG.jwtSecret;

var userAuth = require ("../models/user");

var UserAuth = new userAuth();

var user = {};

user.constructor = function(){
	console.log ("ok");
};

user.home=function(req,res){
	   console.log(path.resolve(__dirname + "/../index.html"));
		 res.sendFile(path.resolve(__dirname + "/../index.html"));
		}

user.signup=function(req,res){
			var data=req.body;
			UserAuth.signupdata(data,function(Obj){
				if(Obj){
				 
				 res.send(Obj);
				 }
			});
		}

user.studentlogin=function(req,res){
		res.sendFile(path.resolve(__dirname+"/../views/student/studentlogin.html"));
		}
/*
user.teacherlogin=function(req,res){
	  console.log(__dirname);
		res.sendFile(path.resolve(__dirname+"/../views/teacher/teacherlogin.html"));
		}

user.login=function (req,res){
			var data=req.body;
			var user=[];
			UserAuth.signInWithUserNameAndPassword(data,function(user){
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
			  var token=jsonwebtoken.sign({id:email,username:user[0].username,user:data.client},TOKEN_SECRET/*,{expiresIn:TOKEN_EXPIRES});
			  res.cookie('token',token).sendStatus(200);
			}
			});
		}
		*/
/*
user.login=function(request,response){
	console.log (request.body);
	UserAuth.signInWithUserNameAndPassword (request.body.username, request.body.password)

	.then (function(resolve){
		response.redirect ("/");
	})

	.catch (function (reject){
		response.render ("404.ejs" , {error : reject})
	})
}
*/

module.exports=user
