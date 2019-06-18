
var express = require('express');
var router = express.Router();

console.log("Well I got here");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('howto', { title: 'Express' });
});

module.exports = router;