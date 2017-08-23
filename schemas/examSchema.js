
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var examSchema=new Schema({
	  userEmail:{type:String,required:true},
	  examName:{type:String,required:true,unique:true},
	  examDes:String,
    examStartDate:{type:Date,required:true},
		examEndDate:{type:Date,required:true},
    examDur:{type:String,required:true},
		examMarks:{type:Number,required:true},
		groupId:[{ type: Schema.ObjectId, ref: 'Group'}]
});

var Exam=mongoose.model('Exam',examSchema);
module.exports=Exam;
