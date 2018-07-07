var bodyParser=require('body-parser');
var mongoose=require('mongoose');

mongoose.connect('mongodb://surya1698:suryasharma123@ds125021.mlab.com:25021/todosurya');


var todoSchema=new mongoose.Schema({
  item:String
});
var Todo=mongoose.model('Todo',todoSchema);

//var obj=[{item:'mango'},{item:'kiwi'},{item:'orange'}];

var urlEncodedParser=bodyParser.urlencoded({extended:false});
module.exports=function(app){
  app.get('/todo',function(req,res){
    Todo.find({},function(err,data){
      if(err) throw err;
      res.render('todo',{todos:data});
    });


  });
  app.post('/todo',urlEncodedParser,function(req,res){
    var newTodo=Todo(req.body).save(function(err,data){
      if(err) throw err;
    res.json(data);
    });
  });
  app.delete('/todo/:item',function(req,res){
    Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
      if(err) throw err;
      res.json(data);
    });

    });


};
