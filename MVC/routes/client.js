var express = require ("express");

var bodyParser = require("body-parser");

var client = require( "controller/client" )

var app = express ();

var router  = express.Router ();

router.get( '/', client.home);


router.get ("/logout", client.logout);

router.post ("/login", bodyParser.urlencoded({ extended: false }), client.login)

router.post("/registration", bodyParser.urlencoded({extended:false}), client.register);

router.post("/forgetPassword", bodyParser.urlencoded ({extended : false}), client.updatePassword);

router.post ("/addOrder", client.addOrder);

//router.post("/incrementUserItem", client.incrementItem);

//router.post("/decrementUserItem", client.decrementItem);

router.get ("/getCategoryProducts", client.getCategoryById);

router.get ("/getCategories", client.getBriefCategory);

router.get ("/getTooltipObject", client.getTooltip)

router.get ("/increaseInQuantity", client.increaseCart)

router.get ("/orderHistory", client.getOrder);

router.get ("/decreaseInQuantity", client.decreaseCart );

module.exports = router;
