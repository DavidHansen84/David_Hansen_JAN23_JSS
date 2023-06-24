var express = require('express');
var router = express.Router();
const fs = require("fs");
const path = require("path");
var passport = require('passport');
var LocalStrategy = require('passport-local');

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

// Verifying if username and password is correct 
passport.use(
  new LocalStrategy(function verify(username, password, cb) {
    let usersArray = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "../data/users.json"))
    );

    let filteredArray = usersArray.filter((x) => x.username === username);
    if (filteredArray.length > 0) {
      let user = filteredArray.find((x) => x.password === password);
      if (user) {
        return cb(null, user);
      }
    }

    return cb(null, false);
  })
);

// If successfull login redirect to memes. I not the login page
router.post('/password', passport.authenticate('local', {
  successReturnToOrRedirect: '/memes',
  failureRedirect: '/login'
}));

router.get('/', function(req, res, next) {
  if(!req.user) {
    res.render("login", {user: null});
  } else {
    res.render("login", {user: req.user});
  }
});

router.post("/logout", function(req, res, next) {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        res.redirect("/login");
    });
});

module.exports = router
