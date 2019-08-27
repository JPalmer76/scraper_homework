var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");


var express = require("express");
var app = express();


app.use(logger("dev"));
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(express.static(process.cwd() + "/public"));

mongoose.connect("mongodb://localhost/scraper_homework");
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function(){
    console.log("connected to mongoose!");
});

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main"})
);
app.set("view engine", "handlebars");

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("listening on port " + port);
});