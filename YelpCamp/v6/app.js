var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds"),
    Comment     = require("./models/comment"),
    User        = require("./models/user")

mongoose.connect("mongodb://localhost/yelp_camp_v6", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

// ********************************************************
//passport configuration
app.use(require("express-session")({
    secret: "Once again blah blah blah",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// ********************************************************

// para el login, pasar el usuario a todos los ejs
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})

// ******** ROUTES ********

app.get("/",function (req, res) {
    res.render("landing")
});


//********************************
//INDEX - Display all campgrounds
//********************************

app.get("/campgrounds",function (req, res) {
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

app.post("/campgrounds",function(req, res) {
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
    
   //redirect back to campgrounds page
   //res.redirect("/campgrounds");
});

//*************************************************
//NEW - Show the form to create a new campground
//*************************************************

app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
})

//*************************************************
//SHOW - Show the form to create a new campground
//*************************************************

app.get("/campgrounds/:id", function(req, res) {
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

})

// ===============================
//      COMMENT ROUTES
// ===============================


//====================================
//      NEW ROUTE
//====================================
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function (err, campground) {
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    })
    
});

//====================================
//      CREATE ROUTE
//====================================
app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
    //lookup campground by id
    Campground.findById(req.params.id, function(err, campground) {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            //console.log(req.body.comment);
            //create new comment
            req.body.comment.author = req.user.username;
            // console.log(req.body.comment.author);
            // console.log(req.body.comment)
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
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
//====================================
//      AUTH ROUTES
//====================================

// show register form
app.get("/register", function(req, res) {
    res.render("register");
});
// handle sign up logic
app.post("/register", function(req, res){
   var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user){
       if(err) {
           console.log(err);
           return res.render("register");
       }
       passport.authenticate("local")(req, res, function(){
           res.redirect("/campgrounds");
       });
   });
});

//show login form
app.get("/login", function(req, res) {
    res.render("login");
})
// handling login logic
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res) {
    res.send("logic login happens here");
})
// log out route
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
})

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function () {
    console.log("The YelpCamp Server Has Started On Port " + process.env.PORT );
});


//trash



/*
var campgroundsVar = [
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg"},
        {name: "Granite Hill", image: "https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg"},
        {name: "Granite Hill", image: "https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
        {name: "Granite Hill", image: "https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg"},
        {name: "Granite Hill", image: "https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"}
   ];
*/