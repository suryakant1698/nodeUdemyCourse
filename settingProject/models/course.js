var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var coursSchema=mongoose.Schema({
    name:String,
    desc:String,
    wistid:Number,
    price:Number,
    ownByTeacher:{type: Schema.Types.ObjectId,ref:'User'},
    ownByStudent:[{
        type:Schema.Types.ObjectId,ref:'User'
    }],
    totalStudent:Number
});
module.exports=mongoose.model('Course',coursSchema);