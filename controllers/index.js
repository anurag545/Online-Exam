var express = require ( "express" );

var userAuth = require ("../models/index");

var UserAuth = new userAuth();

var user = {};

user.constructor = function(){
	console.log ("ok");
};

user.home=function(req,res){
		 res.sendFile(__dirname + "/index.html");
		}

user.signup=function(req,res){
			var data=req.body;
			UserAuth.signupdata(data,function(numAffected){
				if(numAffected){
					console.log(numAffected,"numAffected");
				 res.status(200).send();
				 }
			});
		}

user.studentlogin=function(req,res){
		res.sendFile(__dirname+"/views/student/studentlogin.html");
		}

user.teacherlogin=function(req,res){
		res.sendFile(__dirname+"/views/teachher/teacherlogin.html");
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
			  var token=jsonwebtoken.sign({id:email,username:user[0].username,user:user[0].client},TOKEN_SECRET/*,{expiresIn:TOKEN_EXPIRES}*/);
			  res.cookie('token',token).sendStatus(200);
			}
			});
		}
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
