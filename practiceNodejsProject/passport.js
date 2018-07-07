var passport=require('passport');
var localStrategy=require('passport-local');
var User=require('./models/user');

passport.serializeUser(function(user,done){
    done(null,user._id);

});

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        done(err,user);
    });
});

 passport.use('local-login',new localStrategy({
usernameField: 'email',
passwordField: 'password',
passReqToCallback: true
 },function(req,email,password,done){
    User.findOne({email:email},function(err,user){
        if(err)
        {
            console.log('something terribly wrong');
        return done(err);
        
    }
        if(!user) 
        {
            console.log('something wrong');
            return done(null,false);
        
        }
        console.log('damm');
        return done(null,user);
    });
 }));