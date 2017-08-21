var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");


//====================================
//      NEW COMMENT
//====================================
router.get("/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function (err, campground) {
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
    
});

//====================================
//      CREATE COMMENT
//====================================
router.post("/", isLoggedIn, function(req, res){
    //lookup campground by id
    Campground.findById(req.params.id, function(err, campground) {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            //console.log(req.body.comment);
            //create new comment
            // req.body.comment.author = req.user.username;
            // console.log(req.body.comment.author);
            // console.log(req.body.comment)
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    //add username and id to the comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    //add comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    //redirect compground show page
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

//MIDDLEWARE
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;