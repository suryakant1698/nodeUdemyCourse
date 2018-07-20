var readLine=require('readline');
var util=require('util');


var RL=readLine.createInterface(process.stdin,process.stdout);
RL.question('What is your name',(name)=>{
    RL.setPrompt(`${name} how old are you`);
    RL.prompt();
    RL.on('line',(age)=>{
        if(age<18)
        {
            util.log(`${name} because you are ${age } years old you can not proceed `);
        
        }
        else util.log("fuck you then");
        RL.close();
    });
});