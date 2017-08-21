var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/blog_demo", {useMongoClient: true});

var Post = require("./models/post");
var User = require("./models/user");

Post.create({
    title: "How to cook the best burger Part 4",
    content: "blah blah blah"
}, function (err, post) {
    if(err){
        console.log(err);
    } else {
        User.findOne({email: "bob@gmail.com"},function (err, foundUser){
            if(err){
                console.log(err);
            } else {
                foundUser.posts.push(post);
                foundUser.save(function(err, data){
                    if(err){
                        console.lo(err);
                    } else {
                        console.log(data);
                    }
                })
            }
        })
    }
});


//find user

// find all post of that user

// User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function (err, user) {
//     if(err){
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// })