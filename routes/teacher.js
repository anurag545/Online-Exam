var express = require ("express");

var bodyParser = require("body-parser");

var client = require( "./controller/teacher" )

var app = express ();

var router  = express.Router ();

router.get('/',teacher.home);

module.exports=router
