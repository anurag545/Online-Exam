var express = require ("express");

var bodyParser = require("body-parser");

var auth=require('../config/loginsauth.js');

var studentRoute = require( "../controllers/student")

var app = express ();

var router  = express.Router ();
console.log("okay");
router.get('/login',studentRoute.login);
router.post('/checkLogin',studentRoute.studentlogin);
router.get('/logout',auth.verifyToken,studentRoute.logout);
/*
router.get('/home',auth.verifyToken,studentRoute.home);
router.get('/name',auth.verifyToken,studentRoute.name);
router.get('/profileDetails',auth.verifyToken,studentRoute.profileDetails);
router.get('/profile',auth.verifyToken,studentRoute.profile);
router.get('/newexam',auth.verifyToken,studentRoute.newexam);
router.post('/examDetails',auth.verifyToken,studentRoute.examDetails);
router.post('/question',auth.verifyToken,studentRoute.question);
router.get('/preview',auth.verifyToken,studentRoute.preview);
router.get('/examDetails',auth.verifyToken,studentRoute.examInfo);
router.get('/questionsDetails',auth.verifyToken,studentRoute.quesInfo);*/
module.exports=router
