var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

//mongoose.connect("mongodb://localhost/blog_demo", {useMongoClient: true});
// POST - title, content

var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

module.exports = mongoose.model("Post", postSchema);
