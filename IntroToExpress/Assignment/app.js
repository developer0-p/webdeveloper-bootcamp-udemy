var express = require("express");
var app = express();

//home
app.get("/", function (req, res) {
    res.send("Hi there, welcome to my assignment!")

});
//static routes
app.get("/speak/:animal", function (req, res) {
    var animal = req.params.animal.toLowerCase();
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof"
        
    };
    var sound = sounds[animal];
    res.send("The " + animal + " says \"" + sound + "\"");
});

/*  refactoring...
app.get("/speak/pig", function (req, res) {
    res.send("Oink");
});
app.get("/speak/cow", function (req, res) {
    res.send("Moo");
});
app.get("/speak/dog", function (req, res) {
    res.send("Woof");
});
*/
//dinamic routes
app.get("/repeat/:message/:times", function (req, res) {
    var message = req.params.message;
    var times = Number(req.params.times);
    var result = "";
    for(var i = 0; i < times; i++) {
        result += message + " ";
    }   
    
    res.send(result);
});



//for the rest
app.get("*", function (req, res) {
    res.send("Sorry, page not found... what are you doing with your life?");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started on port "+ process.env.PORT);
});
