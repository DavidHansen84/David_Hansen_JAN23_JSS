var express = require('express');
var router = express.Router();
const fs = require("fs");
const path = require("path");

// Get meme page
router.get('/', function (req, res, next) {
  let data = fs.readFileSync(path.resolve(__dirname, "../data/meme.json"));
  let jsonData = JSON.parse(data)
  let meme = jsonData[0];
  console.log(meme)
  if(!req.user) {
    // If not a user redirect to the login page
    res.redirect("/login")
  } else {
    res.render('meme', { title: 'Meme', meme: meme, user: req.user})
  }
});

module.exports = router;
