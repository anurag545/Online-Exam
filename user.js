
var mongoose=require('mongoose');
mongoose.connect("mongodb://localhost/onlineExam");
var Schema=mongoose.Schema;
var userSchema=new Schema({
	username:{type:String,required:true},
	phone:{type:Number,required:true},
    email:{type:String,required:true,unique:true},
    password{type:String,required:true},
    address:{type:String,required:true},
    country:{type:String,required:true},
    gender:{type:String,required:true},
    occupation:String,
    birthdate:{type:Date,required:true},
    profilepic{type:String,required:true},
});

var User=mongoose.model('User',userSchema)
module.exports=User;


