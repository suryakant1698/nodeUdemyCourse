module.exports=function(app){
    app.get('/',function(req,res,next){
        res.render('accounts/home');
    });
};