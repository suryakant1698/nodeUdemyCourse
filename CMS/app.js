const express=require('express');
var app=express();

//app.engine('ejs',engine);
app.set('view engine','ejs');


app.use('/css',express.static(__dirname+'/public'));

app.get('/',(req,res)=>{
    res.render('home');
   // res.sendFile(__dirname+ '/views/home.html');
});

app.listen(3000);
console.log('You are listening to port 3000');
