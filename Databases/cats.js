var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
//mongoose.connect("mongodb://localhost/cat_app");
mongoose.connect("mongodb://localhost/cat_app", {useMongoClient: true});

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

//adding a new cat to DB
/*
var george = new Cat({
    name: "Mrs. Norris",
    age: 7,
    temperament: "Evil"
});
george.save(function(err, cat){
    if(err){
        console.log("Something went wrong");
    } else {
        console.log("We just saved a cat to de DB");
        console.log(cat);
    }
});*/

Cat.create({
    name: "Snow White",
    age: 15,
    temperament: "Bland"
}, function (err, cat) {
    if(err){
        console.log("Something went wrong");
        console.log(err);
    } else {
        console.log("We just saved a cat to de DB");
        console.log(cat);
    }
})

//retrieve all cats from db

Cat.find({}, function (err, cats) {
    if(err){
        console.log("ERROR!!");
        console.log(err);
    } else {
        console.log("All the cats.....");
        console.log(cats);
    }
});