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
router.get('/', function(req, res, next)  {
     User.find((err, UserList) => {
        if(err)
        {
        return console.error(err)
       }
    else
    {
      
      //Post to console
      console.log(UserList);

      res.render('users', {title: 'Business Contacts List', UserList: UserList});

    }
  });
});

/* GET Route for displaying Add page - CREATE Operation */
router.get('/add', (req, res, next) => {
  res.render('users/users-add', {title: 'Add Customer', UserList: UserList});
});

/* POST Route for procesisng the Add page - CREATE Operation */
router.post('/add', (req, res, next) => {
  let newUser = User({
    "name": req.body.name,
    "email": req.body.email,
    "number": req.body.number
  });

  User.create(newUser, (err, User) =>  {
      if(err)
      {
        console.log(err)
        res.end(err);
      }
      else {
          //Refresh the user list : Take us to the main users page (acts like a refresh) 
          res.redirect('/users-add');
      }
  });

});

/* GET Route for displaying Edit page - UPDATE Operation */
router.get('/edit/:id', (req, res, next) => {

});

/* GET Route for processing the Edit page - UPDATE Operation */
router.post('/edit/:id', (req, res, next) => {

});
/* GET request to perform Deletion - DELETE Operation */
router.get('/delete/:id', (req, res, next) => {

});

module.exports = router;
