var expres=require('express');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var ejs=require('ejs');
var engine=require('ejs-mate');
var cookieParser=require('cookie-parser');
var session=require('express-session');
var morgan=require('morgan');
var MongoStore=require('connect-mongo')(session);
var passport=require('passport');
var passportConf=require('./passport');
var User=require('./models/user');
mongoose.connect('mongodb://surya1698:suryasharma123@ds125021.mlab.com:25021/todosurya',function(err){
    if(err) console.log(err);
    else console.log('Connnectde to the database');
});

var app=expres();
app.engine('ejs',engine);
app.set('view engine','ejs');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:"Hello",
    store:new MongoStore({url:'mongodb://surya1698:suryasharma123@ds125021.mlab.com:25021/todosurya' ,autoReconnect:true})
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/',function(req,res,next){
    res.render('home');
});

app.get('/login',function(req,res,next){
    if(req.user) return res.redirect('/');
    else res.render('login');
});
app.get('/profile',function(req,res,next){
    res.render('profile');
});
app.post('/login',passport.authenticate('local-login', {
    successRedirect:'/profile',
    failureRedirect:'/login',
}));
app.get('/profile',function(req,res,next){
    res.render('profile'); 
});
app.get('/logout',function(req,res){
    req.logout();
    res.redirect('/login');
});
app.post('/create-user',function(req,res,next){
    var user=new User();    
    user.email=req.body.email;
    user.password=req.body.password;
    user.save(function(err){
        if(err)
        {
            console.log('damm');
            console.log(err);
            
    }
        console.log("rcap");
        res.json(user);
    });
});
app.get('/findUser',function(req,res){
   User.findOne({email:'surya@gmail.com'},function(err,foundUser){
    console.log(foundUser.password);  
  });
 
  res.json('boom');  
    
    });
app.listen(5000);
console.log('You are listening to port 5000');