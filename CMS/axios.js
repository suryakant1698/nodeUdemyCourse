const axios=require('axios');
var username='suryakant1698';
axios.get('https://api.github.com/users/'+username).then((res)=>{
    console.log(res.data);
}).catch((err)=>{
    console.log(err);
});

