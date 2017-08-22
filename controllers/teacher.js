var express = require ( "express" );
var app=express();
var path=require("path");
var bodyParser=require('body-parser');
app.use(bodyParser.json({strict:false}));
app.use(bodyParser.urlencoded({extended:false}));
var jsonwebtoken=require('jsonwebtoken');
var CONFIG=require('../config/config.js');
var TOKEN_SECRET=CONFIG.jwtSecret;
var auth=require('../config/loginsauth.js');

var teacherAuth = require ("../models/teacher");
var TeacherAuth = new teacherAuth ();
//app.use(express.static(__dirname+"/public/teacher"));
var teacherController = {};

teacherController.constructor = function(){
	console.log ("ok");
};
teacherController.login=function(request,response){
	  console.log(__dirname);
		response.sendFile(path.resolve(__dirname+"/../views/teacher/teacherlogin.html"));
}
teacherController.teacherlogin=function (request,response){
	 var data=request.body;
	 var user=[];
	 TeacherAuth.signInWithUserNameAndPassword(data,function(user){
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
			  var token=jsonwebtoken.sign({id:email,username:user[0].username,user:"teacher"},TOKEN_SECRET/*,{expiresIn:TOKEN_EXPIRES}*/);
				//console.log(token);
			  response.cookie('token',token).sendStatus(200);
			}
	});
}
teacherController.logout=function(request,response){
	//var token1=req.cookies.token;
	response.clearCookie('token',{path:'/'});
	//console.log(req.cookies,"2");
	response.sendStatus(200);
}
teacherController.home=function(request,response) {
  response.sendFile(path.resolve(__dirname+"/../views/teacher/index.html"));
}
teacherController.name=function(request,response){
	var payloadData=auth.getUserIdNameFromToken;
	var data=payloadData(request);
	response.send(data.username);
}
teacherController.profile=function(request,response){
	response.sendFile(path.resolve(__dirname+"/../views/teacher/profile.html"));
}
teacherController.profileDetails=function(request,response){
	var payloadData=auth.getUserIdNameFromToken;
	var  data=payloadData(request);
	TeacherAuth.profileDetails(data,function(userProfile){
  response.send(userProfile);
	});
}
teacherController.exam=function(request,response) {
  response.sendFile(path.resolve(__dirname+"/../views/teacher/exam.html"));
}
teacherController.newexam=function(request,response) {
	//console.log("teachercon");
  response.sendFile(path.resolve(__dirname+"/../views/teacher/newexam.html"));
}
teacherController.examDetails=function(request,response){
	var payloadData=auth.getUserIdNameFromToken;
	var data1=payloadData(request);
	var data=request.body;
// console.log(data);
	var examObj={
	userEmail:data1.id,
	examName:data.examname,
	examDes:data.examdes,
	examDate:data.examdate,
	examMarks:data.exammarks,
	examTime:data.examtime,
	examDur:data.examdur
};
 TeacherAuth.examDetails(examObj,function(examid){
	 response.send(examid);
 });
}
teacherController.question=function(request,response){
	var data=request.body;
	//console.log(data);
	var quesObj={
	    examId:data.examid,
	    quesType:data.questype,
	    quesName:data.question,
	    quesOptions:data.options,
	    quesAnswer:data.answer,
	    quesMarks:data.marks
	};
 TeacherAuth.question(quesObj,function(examid){
	 response.send(examid);
 });
}
teacherController.preview=function(request,response){
	response.sendFile(path.resolve(__dirname+"/../views/teacher/previewexam.html"));
}
teacherController.examInfo=function(request,response){
	  var examid=request.query.examid;
		TeacherAuth.examInfo(examid,function(exam){
			response.send(exam);
		});
}
teacherController.examInfo=function(request,response){
	  var examid=request.query.examid;
		TeacherAuth.examInfo(examid,function(exam){
			response.send(exam);
		});
}
teacherController.quesInfo=function(request,response){
	  var examid=request.query.examid;
		//console.log(examid,"exanid");
		TeacherAuth.quesInfo(examid,function(questions){
			response.send(questions);
		});
}
teacherController.group=function(request,response){
	response.sendFile(path.resolve(__dirname+"/../views/teacher/group.html"));
}
teacherController.getuser=function(request,response){
	var user=request.query.users;
	//console.log(user);
	TeacherAuth.getuser(user,function(users){
		response.send(users);
	});
}
teacherController.addgroup=function(request,response){
	var payloadData=auth.getUserIdNameFromToken;
	var data1=payloadData(request);
	if(request.query.examid){
		var groupObj={
			userEmail:data1.id,
			groupName:request.body.groupName,
			usersEmail:request.body.users,
		  examId:request.query.examid
		}
	}	else if(!request.query.examid){
			var groupObj={
				userEmail:data1.id,
				groupName:request.body.groupName,
				usersEmail:request.body.users,
			}
		}
		console.log(groupObj,"cont");
		TeacherAuth.addgroup(groupObj,function(group){
			response.send(group);
		});
}
teacherController.getgroups=function(request,response){
	TeacherAuth.getgroups(function(groups){
		response.send(groups);
	});
}
teacherController.getexams=function(request,response){
	TeacherAuth.getexams(function(exams){
		//console.log(exams,"cont");
		response.send(exams);
	});
}
teacherController.newgroup=function(request,response){
	response.sendFile(path.resolve(__dirname+"/../views/teacher/addgroup.html"));
}
teacherController.deleteExam=function(request,response){
	var exam=request.body.exam
	//console.log(exam,"cont");
	TeacherAuth.deleteExam(exam,function(exam){
		response.send(exam);
	});
}
teacherController.deleteGroup=function(request,response){
	var groupid=request.body.groupid
	//console.log(group,"cont");
	TeacherAuth.deleteGroup(groupid,function(group){
		response.send(group);
	});
}
teacherController.addGroupId=function(request,response){
	var addGroup={
   examId:request.body.examId,
	 groupId:request.body.groupId
	}
	console.log( addGroup,"cont");
	TeacherAuth.addGroupId(addGroup,function(){
		response.sendStatus(200);
	});
}
teacherController.editgroup=function(request,response){
		response.sendFile(path.resolve(__dirname+"/../views/teacher/editgroup.html"));
}
teacherController.getgroup=function(request,response){
	var groupid=request.query.groupid;
	TeacherAuth.getgroup(groupid,function(group){
		response.send(group);
	});
}
teacherController.updategroup=function(request,response){
	var groupObj={
		groupId:request.body.groupId,
		groupName:request.body.groupName,
		usersEmail:request.body.users
	}
	TeacherAuth.updategroup(groupObj,function(){
		response.sendStatus(200);
	});
}
module.exports=teacherController
