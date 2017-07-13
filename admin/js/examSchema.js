
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var examSchema=new Schema({
	examname:{type:String,required:true},
	examdes:String,
    examdate:{type:Date,required:true},
    exammarks:{type:Number,required:true},
    examtime:{type:String,required:true},
    examdur:{type:Number,required:true},
});

var Exam=mongoose.model('Exam',examSchema);
module.exports=Exam;


