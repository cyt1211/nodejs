/**
 * Created by pc on 2016/9/19.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'cyt' });
});

module.exports = router;
