var express=require('express');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var morgan=require('morgan');
var secret=require('./config/secret');
var routes=require('./controllers/main');
var ejs=require('ejs');
var engine=require('ejs-mate');
var passsport=require('passport');
var session=require('express-session');
var cookieParser=require('cookie-parser');
var MongoStore=require('connect-mongo')(session);
var flash=require('express-flash');


var app=express();


mongoose.connect(secret.database,function(err){
    if(err) console.log(err);
    else console.log('Connnectde to the database');
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(passsport.initialize());
app.use(passsport.session());
app.use(express.static(__dirname+'/public'));
app.use('ejs',engine);
app.set('view engine','ejs');
app.use(cookieParser());
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:secret.secretKey,
    store:new MongoStore({url:secret.database,autoReconnect:true})
}));
app.use(flash());

app.listen(secret.port);
console.log('You are listening to the port 3000');
var userRoutes=require('./controllers/user')(app);
routes(app);