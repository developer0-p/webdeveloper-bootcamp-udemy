var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

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

router.post("/", middleware.isLoggedIn, function(req, res) {
   //get data from form and add campgrounds to array
   var name = req.body.name;
   var price = req.body.price;
   var image = req.body.image;
   var desc = req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username
   };
   var newCampground = {name: name, price: price,  image: image, description: desc, author: author};
   //campgroundsVar.push(newCampground);
   //create a new campground inside the database
    Campground.create(newCampground, function (err, newlyCreated) {
         if(err){
             console.log(err);
         } else {
             res.redirect("/campgrounds");
         }
     });   

});

//*************************************************
//NEW - Show the form to create a new campground
//*************************************************

router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

//*************************************************
//SHOW - Show the form to create a new campground
//*************************************************

router.get("/:id", function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //console.log(foundCampground);
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });

});

// EDIT CAMPGROUND ROUTE

router.get("/:id/edit", middleware.checkCampgroundOwnership ,function(req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        if(err){
            req.flash("error", "Campground not found");
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});    
        }
    });
});

// UPDATE CAMPGROUND ROUTE

router.put("/:id",middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    });
})

// DESTROY CAMPGROUND ROUTE

router.delete("/:id", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function (err, removedCampground) {
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});




module.exports = router;