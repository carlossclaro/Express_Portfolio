var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home Page' });
});
/* GET home page. */
//Added incase user types /home
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home Page' });
});
/* GET Projects page. */
router.get('/projects', function(req, res, next) {
  res.render('index', { title: 'Projects' });
});
/* GET Services page. */
router.get('/services', function(req, res, next) {
  res.render('index', { title: 'Services' });
});
/* GET About Me page. */
router.get('/aboutme', function(req, res, next) {
  res.render('index', { title: 'About Me' });
});
/* GET Contact me page. */
router.get('/contactme', function(req, res, next) {
  res.render('index', { title: 'Contact Me' });
});


module.exports = router;
