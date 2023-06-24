var express = require('express');
var router = express.Router();
const fs = require("fs");
const path = require("path");
const axios = require('axios');

// Fetch memes and write to memes.json
async function fetchMemes() {
  try {
    let enviroment = fs.readFileSync(path.resolve(__dirname, "../data/enviroment.json"))
    let env = JSON.parse(enviroment);
    const response = await axios.get(env[0].memes);
    const memes = response.data.data.memes;

    const jsonData = JSON.stringify(memes, null, 2); // Convert the array to formatted JSON string

    const jsonFile = path.resolve(__dirname, "../data/memes.json");
    fs.writeFileSync(jsonFile, jsonData); // Write the JSON string to the file

    console.log(`The memes have been written to ${jsonFile}`);
  } catch (error) {
    console.error('Error fetching memes:', error.message);
  }
}

// Fetch memes when the server starts
fetchMemes();

// Get memes page
router.get('/', function (req, res, next) {
  let data = fs.readFileSync(path.resolve(__dirname, "../data/memes.json"));
  if(!req.user) {
    res.render("memes", {title: 'Memes', memes: JSON.parse(data), user: null});
  } else {
    res.render("memes", {title: 'Memes', memes: JSON.parse(data), user: req.user});
  };
});

// Update meme.json with the selected meme
router.post('/:memeId', function (req, res, next) {
  const memeId = req.params.memeId;

  // Read the existing memes JSON file
  const jsonFile = path.resolve(__dirname, '../data/memes.json');
  let data = fs.readFileSync(jsonFile);
  const memes = JSON.parse(data);

  // Find the meme with the given ID
  const selectedMeme = memes.find((meme) => meme.id === memeId);
  if (!selectedMeme) {
    res.status(404).send('Meme not found');
    return;
  }

  // Create a new JSON file with the selected meme
  const newMeme = [selectedMeme];
  const newMemeJSON = JSON.stringify(newMeme, null, 2);

  // Write the new JSON file
  const memeJsonFile = path.resolve(__dirname, '../data/meme.json');
  fs.writeFileSync(memeJsonFile, newMemeJSON);

  console.log('Meme JSON file updated.');

  // Redirect to the meme details page or render it directly
  res.redirect('/meme');
});

module.exports = router;