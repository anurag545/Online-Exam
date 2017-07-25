
var express = require ( "express" ),

	firebase = require('firebase');

	require('firebase/auth');

	require ("firebase/database");


var config = {
		apiKey: "AIzaSyATdBBOKkmrZMcj93HwAQjOD_tleUPMR9Q",
		authDomain: "coveda-79639.firebaseapp.com",
		databaseURL: "https://coveda-79639.firebaseio.com",
		storageBucket: "coveda-79639.appspot.com",
    	messagingSenderId: "316986323751"
};

var app = firebase.initializeApp(config);

var dataRef = app.database();

var clientAuth = function clientAuth(){};

clientAuth.prototype.checkUserState = function checkUserState(client)
{
	return new Promise (function (accept , reject)
	{
			accept (app.auth().currentUser)
	}) 

};

clientAuth.prototype.signInWithUserNameAndPassword = function signInWithUserNameAndPassword(email, password)
{
	return app.auth().signInWithEmailAndPassword (email, password );
}

clientAuth.prototype.createUser = function createuser (details)
{
	return app.auth().createUserWithEmailAndPassword (details.email, details.uPassword)
}

clientAuth.prototype.storeInDatabase=function  storeInDatabase (user)
{
	app.database().ref("user/"+user.uid).set(user);
}

clientAuth.prototype.sendVerification = function sendVerification (email)
{
	console.log (email);
	return app.auth().sendPasswordResetEmail(email);
}

clientAuth.prototype.logout = function logout()
{
	return app.auth ().signOut();
}

clientAuth.prototype.getBriefCategories = function (callback)
{
	return new Promise (function (resolve, reject){  
		var briefCat = dataRef.ref ("categoryInBrief").on ("value", function (snap)
		{
			resolve(snap.val());
		})
	})
}

clientAuth.prototype.getCategories = function getCategories(category)
{
	return new  Promise (function (resolve, reject)
	{

		if(!category)
		{
			var catRef = dataRef.ref("categories");
			catRef.on ("value" , function(snap)
			{
			//	console.log (snap.val())

			    resolve (snap.val())
			})
		}
		else
		{
			var catRef = dataRef.ref("categories");
			
			var catOrderbyChildName = dataRef.orderByChild ( "name" );
			
			var catQuery = catOrderbyChildName.equalto(category);
			
			catQuery.on("value", function (snap)
			{
			//	console.log (snap.val())

			    resolve (snap.val())
				
			})
		}	
	});
}

clientAuth.prototype.increment = function(info, callback) {

	return new Promise (function (resolve, reject)
	{
		var  dbItemRef=dataRef.ref('categories/' + info.categoryId ).child("items").child( info.productId);

   		dbItemRef.transaction(function(item) {

		    if(item != null)
		    {
//		    	console.log ("okfdfdfhgd",item);

		        var currentStock= item.inStock;
		    
		        if(currentStock<=0 || currentStock == null )
		        {
			        reject ("error");
		        }
		        
		        else
		        {
		  			item.inQueue++;
	    		    item.inStock--;
	    		    resolve(item);

	      		}
				return item;		    	

		    }
		    
	    });

	})
		
};

clientAuth.prototype.decrement = function(info, callback)
{
	return new Promise (function (resolve, reject){

		var  dbItemRef=dataRef.ref('categories/' + info.categoryId ).child("items").child( info.productId);

		dbItemRef.transaction(function(item) {
	       
	        if(item!=null)
	        {
	     		var currentStock=item.inStock;

	            if(item.inQueue)
	            {
	              item.inQueue--;
	              item.inStock++;
	         	  resolve (item );
	         	}

	         	else
	         	{
	         		reject ("already empty");
	         	}
	        }
	        return item;
	    });


	})

}

clientAuth.prototype.getCategoryById = function(id) 
{
	return new Promise (function (resolve, reject)
	{
		var  dbItemRef = dataRef.ref ('categories/' + id );

		dbItemRef.on ("value", function(snap){

			resolve(snap.val());

		})	
	})

};


clientAuth.prototype.getTooltip = function (callback)
{
	var toolRef = dataRef.ref ("productsTooltip");
	
	toolRef.on ("value", function (snap){
	
		callback (snap.val());
	
	})
}

clientAuth.prototype.storeUserOrder = function (info)
{	
	var user = app.auth().currentUser;
	
	//console.log (user);
	//if(user = app.auth().currentUser)
		return app.database().ref("orderHistory/"+user.uid + "/").push (info);
}

clientAuth.prototype.getOrder = function (callback)
{
	return new Promise (function (resolve, reject)
	{
		//	console.log (app.auth().currentUser.uid)
		var orderRef =  dataRef.ref("orderHistory/"+app.auth().currentUser.uid + "/");
		orderRef.on("value", function (snap) {
		//	console.log (snap.val())
			resolve (snap.val ());
		});		
	})

}

module.exports = clientAuth;