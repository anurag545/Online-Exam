
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var questionSchema=new Schema({
	examId:{type:String,required:true},
	quesType:{type:String,required:true},
    quesName:{type:String,required:true},
    quesOptions:{type:String,required:true},
    quesAnswer:{type:String,required:true},
    quesMarks:{type:Number,required:true}
});

var Question=mongoose.model('Question',questionSchema);
module.exports=Question;