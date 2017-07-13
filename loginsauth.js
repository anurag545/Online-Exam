var jsonwebtoken=require('jsonwebtoken');
var CONFIG=require('./config.js');
var TOKEN_SECRET=CONFIG.jwtSecret;
function verifyToken(request,response,next){
var token=request.body.token || request.query.token || request.headers['x-access-token'];
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
  	response.status(403).json({
  		success:false,
  		message:'No token provided'
  	});
  }
}
function getTokenPayload(request){
 var payload=null;
 var token=request.body.token || request.query.token || request.headers['x-access-token'];
 if(token){
  payload=jsonwebtoken.decode(token,{complete:true}).payload;
 }
 return payload;
}
function getUserIdNameFromToken (request){
	var payload=getTokenPayload(request);
	if(playload){
		return payload;
	}
  return null;
}
module.exports={
	verifyToken:verifyToken,
	getUserIdNameFromToken:getUserIdNameFromToken
};