var express = require ( "express" );

var adminAuth = require ("models/admin");

var url = require('url');


var adminAuth = new adminAuth();

var admin = {};

admin.constructor = function(){};

admin.home = function(request, response)
{
	adminAuth.isAdmin ().then (function(user){

		if(user)
		{
			adminAuth.getCategory().then(function(obj)
			{
				console.log (obj);
				response.render ( "admin/home.ejs" , {object : obj })
			})	
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

admin.login = function (request, response)
{
	console.log (request.body)

	adminAuth.signInWithUserNameAndPassword (request.body.log, request.body.pwd)

	.then (function(resolve){
		response.redirect ("/adminHome");
	})

	.catch (function (reject){
		response.render ("404.ejs" , {error : reject})
	})
}

admin.logout = function (request, response)
{
	adminAuth.logout ()
	.then (function (accept)
	{
		response.status(200).redirect("/");
	})
}

admin.getCategoryById = function (request, response)
{
	console.log (request.query.id);

	adminAuth.getCategoryById(request.query.id).then( function(items)
	{
		
		if(items)
		{	
			console.log("admin-home");
			var obj = {};
	        items.key=request.query.id;
			response.status (200)
			console.log(obj);
			response.render ("admin/updateTable.ejs", {obj : items});
		}
		else
		{
			response.status (200).send ("data not found");
		}
	})

	.catch (function(reject)
	{
		console.log ("idsh"+reject)
		response.status(200).send ("data not found");
	})
		
}

admin.addProductForm = function (request, response)
{
	console.log ("shdjsgdhgsfhgshfdhgfdshghjdgshhjgsghdhg")
	adminAuth.getCategory().then(function(obj)
	{
		console.log (obj);
		response.render ( "admin/addProductForm.ejs" , {obj : obj})
	})
}

admin.addProduct = function (request, response)
{
	console.log (request.body);
	var productDetails = {
	    name:	request.body.name,
	    inStock: request.body.quantity,
		measuredIn : request.body.measuredIn,
		inQueue: 0,
		total: request.body.quantity,
		price  : request.body.price,
		discription : request.body.discription,
		date : Date.now(),
		active: 1
	};

	var category = request.body.category;

	adminAuth.addProduct(category, productDetails, request.file)
	.then (function(data)
	{
		response.redirect ("/adminHome");
	})
	.catch (function (error)
	{
		response.send (error);
	})
}

admin.updateQuantity = function (request , response)
{
	
	var info = {
	productId :	request.query.productId,
	categoryId : request.query.categoryId,
	quantity : parseInt (request.query.quantity)
	};
	console.log (info)
	adminAuth.modify (info,function(items)
	{
		console.log (items);
	 	response.status(200).send (items)
	})
}


admin.addCategory = function (request , response)
{
     adminAuth.addCategory({name : request.body.catName, date : Date.now()}).

     then(function (){
		 response.redirect ("/adminHome");

     }).

     catch(function (err){
     	response.send (err);
     })
}

/*admin.addProduct = function (request, response)
{
	var productDetails = {
	    name:	request.body.name,
	    inStock: request.body.quantity,
		measuredIn : request.body.measuredIn,
		price  : request.body.price,
		discription : request.body.discription,
		date : Date.now(),
		active: 1
	};

	var category = request.body.category;

	adminAuth.addProductInDatabase(category, productDetails)
	.then (function(data)
	{
		response.send (data);
	})
	.catch (function (error)
	{
		response.send (error);
	})
}
*/
module.exports = admin;
