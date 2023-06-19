var express = require('express');
var router = express.Router();

//Get Login
router.get('/', function (req, res, next) {
    res.render('login', { title: 'Login'});
});

module.exports = router;

