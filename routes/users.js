/*users.js created by Carlos Cruz-Claro 0N 2020-10-11
#300-902-439 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
