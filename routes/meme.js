var express = require('express');
var router = express.Router();
const fs = require("fs");
const path = require("path");
// const { resolve } = require('path');
// const axios = require('axios');

// Get meme page
router.get('/', function (req, res, next) {
  let data = fs.readFileSync(path.resolve(__dirname, "../data/meme.json"));
  let jsonData = JSON.parse(data)
  let meme = jsonData[0];
  console.log(meme)
  if(!req.user) {
    res.render('meme', { title: 'Meme', meme: meme, user: null});
  } else {
    res.render('meme', { title: 'Meme', meme: meme, user: req.user})
  }
});


module.exports = router;
