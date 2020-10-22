/*users.js created by Carlos Cruz-Claro 0N 2020-10-11
#300-902-439 */
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//Connect to our User Model
let User = require('../models/userModel');

/* GET users listing. 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

*/

/* GET Route for the User list page - READ Operation */
router.get('/', (req,res, next) => {
  User.find((err, UserModel) => {
    if(err)
    {
        return console.error(err)
    }
    else
    {
      console.log(UserModel);
    }
  });
});

module.exports = router;
