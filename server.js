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

app.post("/fibonacci", function(req, res){
  var nums = req.body, fib = [1, 1], out = [];
  var max = Math.max.apply(null, nums);
  var i, l2, l1, c;
  for(i = 2; i < max + 1; i++){
    l2 = fib[i - 2];
    l1 = fib[i - 1];
    fib.push(l2 + l1);
  }
  for(i = 0; i < nums.length; i++){
    out.push(fib[nums[i] - 1]);
  }
  res.json(out);
});

app.post("/anagram", function(req, res){
  var pairs = req.body, out = [];
  pairs.forEach(function(pair){
    var a = pair[0].replace(/\s/g,"").toLowerCase().split("");
    var b = pair[1].replace(/\s/g,"").toLowerCase().split("");
    var test = (function(){
      var i, l = a.length, bi;
      if(a.length !== b.length) return false;
      for(i = 0; i < l; i++){
        bi = b.indexOf(a[i]);
        if(bi < 0) return false;
        else b[bi] = null;
      }
      return true;
    }());
    out.push(test);
  });
  res.json(out)
});

app.post("/palindrome", function(req, res){
  var words = req.body, out = [];
  words.forEach(function(word){
    var reverse = word.split("").reverse().join("");
    out.push(word === reverse);
  });
  res.json(out);
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Listening!");
});
