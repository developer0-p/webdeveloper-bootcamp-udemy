var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//********************************
//INDEX - Display all campgrounds
//********************************

router.get("/",function (req, res) {
    //res.render("campgrounds", {campgrounds:campgroundsVar});
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampground){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampground, currentUser: req.user});
            //console.log("We just create a new campground");
            //console.log(campground);
        }
    });
});

//********************************
//NEW - Add a campground to the DB
//********************************

router.post("/",function(req, res) {
   //get data from form and add campgrounds to array
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var newCampground = {name: name, image: image, description: desc};
   //campgroundsVar.push(newCampground);
   //create a new campground inside the database
    Campground.create(newCampground, function (err, newlyCreated) {
         if(err){
             console.log(err);
         } else {
             res.redirect("/campgrounds")
         }
     });   

});

//*************************************************
//NEW - Show the form to create a new campground
//*************************************************

router.get("/new", function(req, res) {
    res.render("campgrounds/new");
})

//*************************************************
//SHOW - Show the form to create a new campground
//*************************************************

router.get("/:id", function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err)
        } else {
            //console.log(foundCampground);
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });

});

module.exports = router;