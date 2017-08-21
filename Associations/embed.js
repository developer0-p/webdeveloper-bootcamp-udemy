var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/blog_demo", {useMongoClient: true});
// POST - title, content

var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model("Post", postSchema);

// USER - email, name

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
var User = mongoose.model("User", userSchema);


User.findOne({name: "Hermione Granger"}, function (err, user) {
    if(err){
        console.log(err)
    } else {
        user.posts.push({
            title: "3 Things I really hate",
            content: "Voldemort. Voldemort. Voldemort"
        });
        user.save(function (err, user) {
            if(err){
                console.log(err);
            } else {
                console.log(user);
            }
        });
    }
});

/*
var newUser = new User({
    email: "hermione@hogwarts.edu",
    name: "Hermione Granger"
});

newUser.posts.push({
    title: "How to bre polyjuice potions class to learn it",
    content: "Just kidding. Go to potions class to learn it"
});

newUser.save(function(err, user){
    if(err) {
        console.log(err)
    } else {
        console.log(user)
    }
});

var newPost = new Post({
    title: "Reflections on apples",
    content: "They are delicious"
});
newPost.save(function(err, user){
    if(err) {
        console.log(err)
    } else {
        console.log(user)
    }
});
*/