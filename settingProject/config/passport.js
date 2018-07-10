var passport=require('passport');
var FaceboookStrategy=require('passport-facebook').Strategy;
var secret=require('./secret');
var UserSchema=require('../models/user');
var  async=require('async');
var request=require('request');



passport.serializeUser(function(user,done){
    done(null,user._id);
});


passport.deserializeUser(function(id,done){
    UserSchema.findById(id,function(err,user){
        done(err,user);
    });
});

passport.use(new FaceboookStrategy(secret.facebook,function(req,token,refreshToken,profile,done){
    UserSchema.findOne({facebook:profile.id},function(err,user){
        if(err)
        return done(err);
        if(user)
        {
            req.flash('loginMessage','Succesfuly login with facebook');
            console.log('damm');
            return done(null,user);            
        }
        else{
           async.waterfall([
               function(callback){
                 
            newUser=new UserSchema();
            newUser.email=profile._json.email;
            newUser.facebook=profile.id;
            newUser.tokens.push({kind:'facebook',token:token});
            newUser.profile.name=profile.displayName;
            newUser.profile.picture='https://graph.facebook.com/'+profile.id+'/picture?type=large';
            newUser.save(function(err){
                if(err) throw err;
                req.flash('loginMessage','Succesfuly login with facebook');
                callback(err,newUser);
            });

               },
               function(newUser,callback){
                request({
                    url:'https://us18.api.mailchimp.com/3.0/lists/f8c41d8266/members',
                    method:'post',
                    headers:{
                        'Authorization':'randomUser 64d9e2381d20c45c63a93ad70640d03b-us18',
                        'Content-Type':'application/json'
                    },
                    json:{
                        'email_address':newUser.email,
                        'status':'subscribed'
                    }
                },function(err,response,body){
                    if(err) done(err,newUser);
                    else {
                        console.log('Succesful mailchimp operation ');
                        return done(null,newUser);
                    }
                });
               }
           ]);
        }
    });
}));