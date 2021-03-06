var User=require('../models/user');
var Course=require('../models/course');
var async=require('async');

module.exports=function(app){
    app.route('/become-an-instructor').get(function(req,res,next){
        res.render('teacher/become-an-instructor');
    }).post(function(req,res,next){
        async.waterfall([
            function(callback){
                var course=new Course();
                course.title=req.body.title;
                console.log(course.title);
                course.save(function(err){

                    callback(err,course);

                });
            },
            function(course,callback){
                User.findOne({_id:req.user._id},function(err,foundUser){
                    foundUser.role="teacher";
                    foundUser.coursesTeach.push(course._id);
                    foundUser.save(function(er){
                        if(err) console.log(err);
                        
                        res.redirect('teacher/dashboard');
                    });
                });
            }
        ]);
    });
app.get('/teacher/dashboard',function(req,res,next){
    if(!req.user) res.redirect('/login');
    User.findOne({_id:req.user._id})
    .populate('coursesTeach')
    .exec(function(err,foundUser){
        console.log(foundUser);        
        res.render('teacher/teacher-dashboard',{foundUser:foundUser});
    });
});
};
