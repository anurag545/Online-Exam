
var express = require ( "express" );

var	firebaseAdmin = require('firebase');

	require('firebase/auth');

	require ("firebase/database");

var fs = require ("file-system")

var config = {
		apiKey: "AIzaSyATdBBOKkmrZMcj93HwAQjOD_tleUPMR9Q",
		authDomain: "coveda-79639.firebaseapp.com",
		databaseURL: "https://coveda-79639.firebaseio.com",
		storageBucket: "coveda-79639.appspot.com",
    	messagingSenderId: "316986323751"
};

var gcloud = require('google-cloud')({
  
   keyFilename: 'PRIVATEFILES/coveda-79639-firebase-adminsdk-pbi69-e287c4d0dd.json',
    projectId: "coveda-79639.appspot.com",
    storageBucket: "coveda-79639.appspot.com"

});


var gcs = gcloud.storage();

var app = firebaseAdmin.initializeApp(config, "secondary") ;

var dataRef = app.database().ref();

var AdminAuth = function AdminAuth(){};


AdminAuth.prototype.isAdmin = function checkUserState(admin)
{

	return new Promise (function (accept , reject)
	{
		//console.log (app.auth().currentUser.position);

			if (app.auth().currentUser && app.auth().currentUser.position === "admin")
			{
				app.auth().currentUser.position
				accept ( true )
			}
			else
			{
				accept (false)
			}
	})
};

AdminAuth.prototype.signInWithUserNameAndPassword = function signInWithUserNameAndPassword(email, password)
{

	return new Promise (function (resolve, reject)
	{
		app.auth().signInWithEmailAndPassword (email, password )

		.then (function (user)
		{

			var positionRef = dataRef.child("admin").child(user.uid).child("position");
			
			positionRef.on("value", function(ss)
			{
				console.log (ss.val());
				if(ss.val() === "admin")
				{
					app.auth().currentUser.position = "admin"
					resolve(true);
				}
				else
				{
					reject ( "you are not admin" )
				}
			})
		})
		
		.catch(function (error){
			reject (error);
		});	
	})
}

AdminAuth.prototype.logout = function logout()
{

	return new Promise (function(accept, reject )
	{
		app.auth ().signOut()

		.then (function (detail)
		{
			delete app.auth().currentUser.position;
			accept(detail)
		})

		.catch (function(error)
		{
			reject (error);
		});
	})
}

AdminAuth.prototype.addProduct = function (category, productDetail, image)
{
	var itemRef = dataRef.child("categories").child(category).child("items");
	return new Promise (function(resolve , reject)
	{
			
		adminObj.uploadPhoto (image)

		.then( function (fileInfo)
		{
			// productDetail.picture = fileInfo.name;
			console.log (fileInfo)
			
			itemRef.push(productDetail)

			.then (function (data)
			{
				resolve(productDetail);
			})
		})			
		.catch (function (error)
		{
			console.log(error)
			reject (error)
		})
	})
}

AdminAuth.prototype.getCategory = function ()
{
	return new Promise (function (accept, reject)
	{
		var catRef = dataRef.child("categoryInBrief");
		catRef.on( "value", ss =>{
			accept(ss.val());
		})		
	})

}

AdminAuth.prototype.addCategory = function (categoryDetails)
{
	var categoryRef = dataRef.child("categories");
	var newKey = categoryRef.push().key;
	
	refObj = {};
	
	var key1 = "categories/"+newKey
	
	var key2 = "categoryInBrief/"+newKey;
	
	refObj[key1] = categoryDetails;

	refObj[key2] = categoryDetails.name;

	return dataRef.update(refObj);

}


AdminAuth.prototype.modify = function(info, callback) 
{
	var dbItemRef =dataRef.child('categories').child( info.categoryId ).child("items");
	
	var item = dbItemRef.child(info.productId);

		item.transaction(function(item) 
		{

	    if(item != null)
	    {
	    	console.log (item);

   		

	        var currentStock= item.inStock;
	         
	        item.inStock = currentStock + info.quantity;
	        item.total = item.total + info.quantity;

	  		if(item.inStock <= 0 )
	  		{
	  			item.inStock = 0;
	  		}
	  		if(item.total <= 0 )
	  		{
	  			item.total = 0;
	  		}
	  		

   		    callback(item);


	    }
	    return item;

    });
	
};




AdminAuth.prototype.getCategoryById = function(id) 
{
	return new Promise (function (resolve, reject)
	{
		console.log (id);

		var  dbItemRef = dataRef.child('categories/' + id );

		dbItemRef.on ("value", function(snap){

			resolve(snap.val());

		})	
	})

};

AdminAuth.prototype.uploadPhoto = function (data)
{
	return new Promise(function(resolve, reject)
	{
		 var options = {
		 			destination: data.path,
					metadata: {
							    contentType: 'image/png'
							  }
				};


     		var backups = gcs.bucket("coveda-79639.appspot.com");
 
			backups.upload(data.path, function(err, file) {
				if(err){
					reject (err)
				}
				else {
					fs.unlink(data.path, (err) => {
			  			if (err)
			  				reject (err);
			 			else
			 			{
			 				console.log (file)
			 				console.log('successfully deleted ', data.path);
			 				resolve("ok");	
			 			}
					})
				};
			  	
			});;
		})
}


var adminObj = new AdminAuth();

module.exports = AdminAuth;