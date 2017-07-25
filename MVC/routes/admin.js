var express = require ("express");

var bodyParser = require("body-parser");

var admin = require( "controller/admin" )

var multer = require ("multer");

var upload = multer({ storage : storage });

var app = express ();

var storage =   multer.diskStorage(
{
	
  destination: function (req, file, callback) {
    callback(null, 'public');
  },

  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now()+'.jpeg');
  }

});

var upload = multer({ storage : storage });


var router  = express.Router ();

router.get( '/', admin.home);

router.post ("/login", bodyParser.urlencoded({ extended: false }), admin.login)

router.get ("/logout", admin.logout);

router.get("/getCategoryProducts", admin.getCategoryById);

router.post( "/addCategories", bodyParser.urlencoded({ extended: false }), admin.addCategory);

router.get( "/addProductForm", admin.addProductForm);

router.get("/changeQuantity", admin.updateQuantity);

router.post ("/addProduct",upload.single("uploads") ,admin.addProduct);

module.exports = router;
