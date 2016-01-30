var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", function(req, res){
  res.json({success: "Hi there!"});
});

app.post("/round0", function(req, res){
  var i = 0, out = [];
  for(i = 0; i < req.body; i++){
    out.push("Hello World");
  }
  res.json(out);
});

app.post("/fizzbuzz", function(req, res){
  var nums = req.body, out = [];
  nums.forEach(function(num){
    if(num % 6 === 0) out.push("FizzBuzz");
    else if(num % 2 === 0) out.push("Fizz");
    else if(num % 3 === 0) out.push("Buzz");
    else out.push(num);
  });
  res.json(out);
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Listening!");
});
