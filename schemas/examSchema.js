
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var examSchema=new Schema({
	  userEmail:{type:String,required:true},
	  examName:{type:String,required:true,unique:true},
	  examDes:String,
    examDate:{type:Date,required:true},
    examMarks:{type:Number,required:true},
    examTime:{type:String,required:true},
    examDur:{type:Number,required:true},
		groupId:[{ type: Schema.ObjectId, ref: 'Group'}]
});

var Exam=mongoose.model('Exam',examSchema);
module.exports=Exam;
