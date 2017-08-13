var jsonwebtoken=require('jsonwebtoken');
var CONFIG=require('./config.js');
var TOKEN_SECRET=CONFIG.jwtSecret;
//var Cookies=require('cookies');
function verifyToken(request,response,next){
  //var cookies=new Cookies(request,response);
  //var tokenCookies=cookies.get("token");
  var tokenCookies=request.cookies.token;
  //console.log(tokenCookies);
var token=request.body.token || request.query.token || request.headers['x-access-token'] || tokenCookies;
 if(token){
jsonwebtoken.verify(token,TOKEN_SECRET,function (err,decoded){
if(err){
	response.status(403).json({
		success:false,
		message:'Failed to authenticate token.'
	});
	return;
     }
      request.decoded=decoded;
      next();
   });
  }
  else{
     response.redirect('/');
  	/*response.status(403).json({
  		success:false,
  		message:'No token provided'
  	});*/
  }
}
function getTokenPayload(request){
  var tokenCookies=request.cookies.token;
 var payload=null;
 var token=request.body.token || request.query.token || request.headers['x-access-token'] || tokenCookies ;
 if(token){
  payload=jsonwebtoken.decode(token,{complete:true}).payload;
 }
 return payload;
}
function getUserIdNameFromToken (request){
	var payload=getTokenPayload(request);
	if(payload){
		return payload;
	}
    return null;
}
module.exports={
	verifyToken:verifyToken,
	getUserIdNameFromToken:getUserIdNameFromToken
};
