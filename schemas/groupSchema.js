var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var groupSchema=new Schema({
	  groupName:{type:String,required:true},
		usersEmail:{type:[String],required:true}
});

var Group=mongoose.model('Group',groupSchema);
module.exports=Group;
