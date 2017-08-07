
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var examSchema=new Schema({
	examName:{type:String,required:true},
	examDes:String,
    examDate:{type:Date,required:true},
    examMarks:{type:Number,required:true},
    examTime:{type:String,required:true},
    examDur:{type:Number,required:true}
});

var Exam=mongoose.model('Exam',examSchema);
module.exports=Exam;


