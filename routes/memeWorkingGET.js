var express = require('express');
var router = express.Router();
const fs = require("fs");
const path = require("path");
// const { resolve } = require('path');
// const axios = require('axios');

// Get meme page
router.get('/', function(req, res, next) {
  res.render('memes', { title: 'Memes', memes: JSON.parse(data) });
});

// Get specific meme details
router.get('/:memeId', function (req, res, next) {
    let data = fs.readFileSync(path.resolve(__dirname, "../data/memes.json"));
    const memes = JSON.parse(data);
    const memeId = req.params.memeId;
  
    const meme = memes.find((meme) => meme.id === memeId);
    if (!meme) {
      // Handle error if meme with the given ID is not found
      res.status(404).send('Meme not found');
      return;
    }
  
    res.render('meme', { title: 'Meme', meme });
  });
  
  module.exports = router;