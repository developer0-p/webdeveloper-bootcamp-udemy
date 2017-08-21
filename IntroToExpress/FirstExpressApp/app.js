var express = require("express");
var app = express();


app.get("/", function(req,res) {
   res.send("Hi there!");
   
});

app.get("/bye", function(req,res) {
   res.send("Good bye!");
   
});

app.get("/dog", function(req,res) {
    console.log("Someone made a request");
   res.send("MEAOW!");
   
});

app.get("/r/:subredditName", function(req,res) {
   res.send("Welcome to " + req.params.subredditName + " subreddit!");
   
});

app.get("*", function(req,res) {
   res.send("You are a STAR!");
   
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started on port "+ process.env.PORT);
});
