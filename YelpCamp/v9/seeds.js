var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment     = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm4.staticflickr.com/3549/3865828031_498e2ae50a.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit possimus nam ad ut odio nostrum, sint laudantium explicabo autem eaque. Dolor ab inventore, soluta alias doloribus at, dolorem id error?    "
    },
    {
        name: "Desert Mesa",
        image: "https://farm2.staticflickr.com/1076/826745086_e1c145c054.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit possimus nam ad ut odio nostrum, sint laudantium explicabo autem eaque. Dolor ab inventore, soluta alias doloribus at, dolorem id error?    "
    },
    {
        name: "Canyon Floor",
        image: "https://farm5.staticflickr.com/4150/4832531195_9a9934b372.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit possimus nam ad ut odio nostrum, sint laudantium explicabo autem eaque. Dolor ab inventore, soluta alias doloribus at, dolorem id error?    "
    }
]

function seedDB() {
    Campground.remove({}, function(err){
        // if(err){
        //     console.log(err);
        // }
        // console.log("removed campgrounds!")
        // //add a few campgrounds
        // data.forEach(function (seed) {
        //     Campground.create(seed, function (err, campground) {
        //         if(err){
        //             console.log(err);
        //         } else {
        //             console.log("added campground!"); 
        //             //add a few comments
        //             //console.log(campground)
        //             Comment.create(
        //                 {
        //                     text: "This place is great, but I wish there was internet",
        //                     author: "Homer"
        //                 }, function(err, comment){
        //                     if(err) {
        //                         console.log(err);
        //                     } else {
        //                         //console.log(comment)
        //                         campground.comments.push(comment);
        //                         campground.save();
        //                         console.log("created new comment!")
        //                     }
        //                 }
        //             )
        //         }
        //     });
        // });
    });   


}

module.exports = seedDB;