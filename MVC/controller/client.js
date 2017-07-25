
var express = require ( "express" );

var clientAuth = require ("models/client");

var url = require('url');


var ClientAuth = new clientAuth();

var client = {};

client.constructor = function(){
	console.log ("ok");
};

client.home = function(request, response)
{
	ClientAuth.checkUserState ().then (function(user){

		if(user)
		{
			response.render ( "home.ejs" )	
		}
		else 
		{
			response.render ("login.ejs");
		}

	}).catch (function (reject)
	{
			response.render("404.ejs", {error : reject})
	})
}

client.login = function (request, response)
{
	console.log (request.body)

	ClientAuth.signInWithUserNameAndPassword (request.body.log, request.body.pwd)

	.then (function(resolve){
		response.redirect ("/");
	})

	.catch (function (reject){
		response.render ("404.ejs" , {error : reject})
	})
}

client.register = function (request, response)
{
	var details = request.body;

	extractObject(request, function (details)
	{

		ClientAuth.createUser (details)

		.then (function(accept)
		{
			console.log ("user - aceept")
			var userData = {

								email : accept.email,

								mobile : details.mobile,

								firstName : details.firstName,

								lastName : details.lastName,

								userPosition : "client",

								active : true,

								date : Date(),

								uid : accept.uid
							};

			console.log (userData);

			ClientAuth.storeInDatabase(userData)
			response. send (JSON.stringify (userData));

		})
		.catch(function (error){
			console.log ("error--user" , error)
		response.send (JSON.stringify({error: error}))
		})
	})
}

client.updatePassword=function (request, response)
{
	console.log (request.body)
	ClientAuth.sendVerification (request.body.email).then (function (data){

		response.send ("<script>alert ('you have sent a mail , pleasse confirm it'); location.reload ()</script>")

	}).catch (function(error){
		response.send ("")
	});
}

client.logout = function (request, response)
{
	ClientAuth.logout ()
	.then (function (accept)
	{

		response.status(200).redirect("/");
	})
}

client.increaseCart = function(request, response)
{
	var url_parts = url.parse(request.url, true);

	var info = {
		categoryId : request.query.categoryId,
		productId : request.query.productId
	}

	ClientAuth.increment(info).then (function(object)
	{
		if (!object)
		{
			response.status (200).send ( { error : "out of stock" });
		}
		else
		{
			console.log (object)
			object.productId = info.productId;
			object.categoryId = info.categoryId;
			response.status (200).send (object)

		}
	})

    .catch (function (reject)
	{
		console.log (reject);
		response.status (200).send ({ error : "out of stock" });
	})
}

client.decreaseCart = function(request, response)
{
	var url_parts = url.parse(request.url, true);

	var info = {
		categoryId : request.query.categoryId,
		productId : request.query.productId
	}

	ClientAuth.decrement(info).then (function(object)
	{
		if (!object)
		{
			response.status (200).send ({ error : "queue is empty" });
		}
		else
		{
			console.log (object)
			object.productId = info.productId;
			object.categoryId = info.categoryId;
			response.status (200).send (object)

		}
	})

    .catch (function (reject)
	{
		console.log (reject);
		response.status (200).send ( { error : "queue is empty" });
	})
}

client.getCategory = function (request, response)
{
     ClientAuth.getCategories()        // by default : fetch all category,
									  // one argument : category name - fetch onecategory product at a time
	.then (function (allCategory){

		console.log (allCategory)
		response.send (JSON.stringify (allCategory))	
	})
}


client.getCategoryById = function (request, response)
{
	
	ClientAuth.getCategoryById(request.query.id).then( function(items)
	{
	
		if(items)
		{	
			items["key"] = request.query.id;
			response.status (200)
			response.render ("productsTable.ejs", {obj : items});
		}
		else
		{
			response.status (404).send ("data not found");
		}
	})

	.catch (function(reject)
	{
		response.status(404).send ("data not found");
	})
		
}

client.getBriefCategory = function (request, response)
{
	ClientAuth.getBriefCategories().then (function (data) 
	{
		//console.log ("hsgdh");
		response.status(200);
		response.send (JSON.stringify(data));
	})
}


client.getTooltip = function (request, response)
{
	ClientAuth.getTooltip(function (obj) {

		if(obj)
		{
			response.status (200);
			response.send (JSON.stringify (obj));
		}
		else
		{
			response.status (404).send ("something went wrong");
		}

	})
}

client.addOrder = function (request, response)
{
	
	extractObject (request, function (info)
	{
	//	console.log("************************************************************************",info);

		info.date = Date.now();

//		console.log (info

		ClientAuth.storeUserOrder (info)

		.then ( function( res )
		{
			response.status(200).send ( res )
		})
		.catch (function (error)
		{
			response.status(200).send(error);
		})		
	})

}

client.getOrder = function (request, response)
{
	ClientAuth.checkUserState ().then (function(user)
	{

		if (user )
		{
			ClientAuth.getOrder().then (function(product)
			{
			//	console.log (product);
				response.status(200).render ("orderHistoryTable.ejs", {obj : product});
			})			
		}
		else
		{
			response.render("404.ejs", {error : "user is not authorized"});
		}
	})
	.catch(function (err){
		("404.ejs",{ error : "may be some non-authorized access" });	
	}); 

}



function extractObject (request, callback)
{
	var body = "";
	var post = "";
	 request.on('data', function (data) {
            body += data;
      });

     request.on('end', function () {
            post = JSON.parse(body);
              callback (post)

      });
   
}


module.exports = client;
