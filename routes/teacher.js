var express = require ("express");
var app = express ();
var bodyParser=require('body-parser');
app.use(bodyParser.json({strict:false}));
app.use(bodyParser.urlencoded({extended:false}));

var auth=require('../config/loginsauth.js');

var teacherRoute = require( "../controllers/teacher")

var router  = express.Router ();
console.log("okay");
router.get('/login',teacherRoute.login);
router.post('/checklogin',teacherRoute.teacherlogin);
router.get('/logout',auth.verifyToken,teacherRoute.logout);
router.get('/home',auth.verifyToken,teacherRoute.home);
router.get('/name',auth.verifyToken,teacherRoute.name);
router.get('/profileDetails',auth.verifyToken,teacherRoute.profileDetails);
router.get('/profile',auth.verifyToken,teacherRoute.profile);
router.get('/newexam',auth.verifyToken,teacherRoute.newexam);
router.post('/examDetails',auth.verifyToken,teacherRoute.examDetails);
router.post('/question',auth.verifyToken,teacherRoute.question);
router.get('/preview',auth.verifyToken,teacherRoute.preview);
router.get('/examDetails',auth.verifyToken,teacherRoute.examInfo);
router.get('/questionsDetails',auth.verifyToken,teacherRoute.quesInfo);
router.get('/group',auth.verifyToken,teacherRoute.group);
router.get('/getuser',auth.verifyToken,teacherRoute.getuser);
module.exports=router
