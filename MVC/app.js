
require ('app-module-path').addPath (__dirname );

var express = require ( "express" ),
	
	path = require ( "path" ),

	bodyParser = require("body-parser");


var client = require("routes/client");

var admin = require("routes/admin")

var	app = new express ();

app.set("view engine", "ejs");

app.set("views" , path.join ( __dirname, 'pages' ));

app.use (express.static (path.join (__dirname,'public')));

app.set ("port" , ( process.env.PORT || 5000 ) );

app.use ("/", client)

app.use ("/adminHome", admin);

app.listen (app.get("port"), function(){
	
	console.log ("listen on "+ app.get ("port"))

});