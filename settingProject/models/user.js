var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var userSchema=new Schema({
    email:{type:String,uniquie:true,lowercase:true},
    facebook:String,
    tokens:Array,
    role:String,
    profile:{
        name:{type:String,default:''},
        picture:{type:String,default:''}
    },
    coursesTeach:[{
        course:{type:Schema.Types.ObjectId,ref:'course'}
    }],
    coursesTaken:[{
        course:{type:Schema.Types.ObjectId,ref:'course'}
    }]    
});

module.exports=mongoose.model('User',userSchema);