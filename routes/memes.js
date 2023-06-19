var express = require('express');
var router = express.Router();
const fs = require("fs");
const path = require("path");
const { Readable } = require('stream');
const axios = require('axios');
// const { resolve } = require('path');

// Get memes page
router.get('/', function (req, res, next) {
  let data = fs.readFileSync(path.resolve(__dirname, "../data/memes.json"))
  res.render('memes', { title: 'Memes', memes: JSON.parse(data) });
});

async function fetchMemes() {
    try {
      const response = await axios.get('https://api.imgflip.com/get_memes');
      const memes = response.data.data.memes;
      console.log(memes);
  
      const jsonData = JSON.stringify(memes, null, 2); // Convert the array to formatted JSON string
  
      const jsonFile = path.resolve(__dirname, '../data/memes.json');
      fs.writeFileSync(jsonFile, jsonData); // Write the JSON string to the file
  
      console.log(`The memes have been written to ${jsonFile}`);
    } catch (error) {
      console.error('Error fetching memes:', error.message);
    }
  }
  
  fetchMemes();

router.get('/Memes', function (req, res, next) {
  res.render('Memes', { title: 'Memes' });
});

module.exports = router;