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

app.post("/from_roman", function(req, res){
  var nums = req.body, out = [];
  var vals = {
    "iv": 4,
    "ix": 9,
    "i": 1,
    "v": 5,
    "xl": 40,
    "xc": 90,
    "x": 10,
    "l": 50,
    "cd": 400,
    "cm": 900,
    "d": 500,
    "c": 100,
    "m": 1000
  }
  nums.forEach(function(str){
    var roman, val, tot = 0;
    str = str.toLowerCase();
    for(roman in vals){
      val = vals[roman];
      str = str.replace(new RegExp(roman, "g"), function(){
        tot += val;
        return "";
      });
    }
    out.push(tot);
  });
  console.log(JSON.stringify(nums))
  console.log(out)
  res.json(out);
});

app.post("/to_roman", function(req, res){
  var nums = req.body, out = [];
  var vals = [
    {num: 1000  ,rom: "m"},
    {num: 900   ,rom: "cm"},
    {num: 500   ,rom: "d"},
    {num: 400   ,rom: "cd"},
    {num: 100   ,rom: "c"},
    {num: 90    ,rom: "xc"},
    {num: 50    ,rom: "l"},
    {num: 40    ,rom: "xl"},
    {num: 10    ,rom: "x"},
    {num: 9     ,rom: "ix"},
    {num: 5     ,rom: "v"},
    {num: 4     ,rom: "iv"},
    {num: 1     ,rom: "i"}
  ]
  nums.forEach(function(num){
    var tot = "";
    vals.forEach(function(val){
      while(num - val.num >= 0){
        num = num - val.num;
        tot += val.rom;
      }
    });
    out.push(tot);
  });
  res.json(out);
});

app.post("/bowling", function(req, res){
  var games = req.body, out = [];
  games.forEach(function(rolls){
    var frame = 0, gameTot = 0, frameTot = 0, frameTries = 0, maxFrames = 10;
    var prevStatus = "";
    rolls.forEach(function(roll){
      if(frame > maxFrames) return;
      frameTot += roll;
      frameTries += 1;
      if(prevStatus === "spare" && frameTries === 1) gameTot += roll;
      if(prevStatus === "strike" && (frameTries === 2 || roll === 10)) gameTot += frameTot;
      if(frame === 10 && (prevStatus === "strike" || prevStatus === "spare")) maxFrames = 11;
      if(frameTot === 10){
        if(frameTries === 1) prevStatus = "strike";
        else if(frameTries === 2) prevStatus = "spare";
        nextFrame();
      }else if(frameTries === 2){
        nextFrame();
      }
    });
    out.push(gameTot);

    function nextFrame(){
      frame += 1;
      frameTries = 0;
      gameTot += frameTot;
      frameTot = 0;
    }
  });
  console.log(JSON.stringify(games));
  console.log(JSON.stringify(out));
  res.json(out)
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Listening!");
});
