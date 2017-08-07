var express = require ("express");

var bodyParser = require("body-parser");

var teacherR = require( "../controllers/teacher")

var app = express ();

var router  = express.Router ();
console.log("okay");
router.get('/',teacherR.home);
router.get('/newexam',teacherR.newexam);
module.exports=router
