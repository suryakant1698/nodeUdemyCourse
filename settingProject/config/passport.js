var passport=require('passport');
var FaceboookStrategy=require('passport-facebook').Strategy;
var secret=require('./secret');
var UserSchema=require('../models/user');
passport.serializeUser(function(user,done){
    done(null,user._id);
});

passport.deserializeUser(function(id,done){
    UserSchema.findById(id,function(err,done){
        done(err,user);
    });
});

passport.use(new FaceboookStrategy(secret.facebook,function(req,token,refreshToken,profile,done){
    User.findOne({facebook:profile.id},function(err,user){
        if(err)
        return done(err);
        if(user)
        return done(null,user);
        else{
            newUser=new UserSchema();
            newUser.email=profile._json.email;
            newUser.facebook=profile.id;
            newUser.tokens.push({kind:'facebook',token:token});
            newUser.profile.name=profile.displayName;
            newUser.profile.picture='https://graph.facebook.com'+profile.id+'/picture?type=large';
            newUser.save(function(err){
                if(err) throw err;
                return done(null,newUser);
            });
        }
    });
}));