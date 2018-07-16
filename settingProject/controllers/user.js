var passport=require('passport');
var passportConf=require('../config/passport');

module.exports=function(app){
    app.get('/login',function(req,res,next){
        if(req.user) res.redirect('/');
        else {
        res.render('accounts/login');
        }
    });
    app.get('/auth/facebook',passport.authenticate('facebook',{scope:'email'}));
    app.get('/auth/facebook/callback',passport.authenticate('facebook',{
        successRedirect:'/profile',
        failureRedirect:'/login'
    }));
    app.get('/logout',function(req,res,next){
        if(req.user) 
         {
        req.logout();
        res.redirect('/');
        }
        else res.redirect('/login');
    });
    app.get('/profile',function(req,res,next){
        if(req.user) 
        res.render('accounts/profile',{message:req.flash('loginMessage')});
        else res.redirect('/login');
    });
    app.get('/privacyPolicy',function(req,res,next){
        res.json('Privacy');
    });

};