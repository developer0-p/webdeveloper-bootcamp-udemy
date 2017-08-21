var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground")
    //Comment     = require("")
    

mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


//  Campground.create(
//      {
//          name: "Granite Hill",
//          image: "https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg",
//          description: "This is a huge granite hill, no bathrooms. No water. Beatiful granite!"
//      }, function (err, campground) {
//          if(err){
//              console.log("Something went wrong");
//          } else {
//              console.log("We just create a new campground");
//              console.log(campground);
//          }
//      });

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
            res.render("index", {campgrounds:allCampground})
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
    res.render("new");
})

//*************************************************
//SHOW - Show the form to create a new campground
//*************************************************

app.get("/campgrounds/:id", function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err)
        } else {
            //render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });

})

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