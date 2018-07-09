module.exports= {
    database:'mongodb://surya1698:suryasharma123@ds125021.mlab.com:25021/todosurya',
    port:3000,
    secretKey:'suryasharma',
    facebook:{
        clientID:'486336545160700',
        clientSecret:'edcae8c2064e068d5fe6202a7271ba7c',
        profileFields:['email','displayName'],
        callbackURL:'https://localhost:3000/auth/facebook/callback',
        passReqToCallback:true, 

    }

};