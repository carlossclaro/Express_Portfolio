let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//Create a reference to the model 
let User = require('../models/userModel')

/* GET Route for the User list page - READ Operation */
module.exports.displayUserList = function(req, res, next)  {
    User.find((err, UserList) => {
       if(err)
       {
       return console.error(err)
      }
   else
   {
     
     //Post to console
     console.log(UserList);

     res.render('users1/users',
      {title: 'Business Contacts List',
       UserList: UserList,
        displayName: req.user ? req.user.displayName: ''});

   }
 });
}
/* GET Route for displaying Add page - CREATE Operation */
module.exports.displayAddPage = (req, res, next) => {
    res.render('users1/add', {title: 'Add Customer',
    displayName: req.user ? req.user.displayName: ''});
  };

/* POST Route for procesisng the Add page - CREATE Operation */
  module.exports.processAddPage = (req, res, next) => {
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
            res.redirect('/users');
        }
    });
  
  };

/* GET Route for displaying Edit page - UPDATE Operation */
  module.exports.displayEditPage = (req, res, next) => {
  
    //Get id from clicked object (table)
    let id = req.params.id;
  
    User.findById(id, (err, userToEdit) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        //Show the edit view
        res.render('users1/edit', {title: 'Edit User', User: userToEdit,
        displayName: req.user ? req.user.displayName: ''})
      }
    });
  };

/* GET Route for processing the Edit page - UPDATE Operation */
  module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;
  
    let updatedUser = User({
      "_id": id,
      "name": req.body.name,
      "email": req.body.email,
      "number": req.body.number
    });
  User.updateOne({_id: id}, updatedUser, (err) => {
    if(err) {
      console.log(err)
      res.end(err)
    } else {
      //Refresh the user list
      res.redirect('/users');
    }
    });
  };
  
  /* GET request to perform Deletion - DELETE Operation */
  module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;
  
    User.remove({_id: id}, (err) => {
        if(err) {
          console.log(err)
          res.end(err)
        } else {
          //Refresh the user list 
          res.redirect('/users')
        }
    })
  
  };
  