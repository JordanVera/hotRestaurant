var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

var Tables = [];

$("#add-btn").on("click", function(event) {
    event.preventDefault();
    var newTable = {
      name: $("#name").val().trim(),
      phone: $("#phone").val().trim(),
      email: $("#email").val().trim(),
      unique: $("#unique").val().trim()
    };

    // Question: What does this code do??
    $.post("/api/tables", newTable)
      .then(function(data) {
        console.log("index.html", data);
      });
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/tables", function (req, res) {
    return res.json(Tables);
});

app.post("/api/tables", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newTable = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newTable.routeName = newTable.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newTable);
  
    Tables.push(newTable);
  
    res.json(newTable);
  });

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});