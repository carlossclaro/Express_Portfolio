/*users.js created by Carlos Cruz-Claro 0N 2020-10-11
#300-902-439 */
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

//Helper function for guard purposes
function requireAuth(req, res, next) {
    //Check if user is logged in 
    if(!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

//Connect to our User Model
//let User = require('../models/userModel');

//Reference being called from controllers/users
let UserController = require('../controllers/users')

/* GET Route for the User list page - READ Operation */
router.get('/', requireAuth, UserController.displayUserList);

/* GET Route for displaying Add page - CREATE Operation */
router.get('/add', requireAuth, UserController.displayAddPage);

/* POST Route for procesisng the Add page - CREATE Operation */
router.post('/add', requireAuth, UserController.processAddPage);

/* GET Route for displaying Edit page - UPDATE Operation */
router.get('/edit/:id', requireAuth, UserController.displayEditPage);

/* GET Route for processing the Edit page - UPDATE Operation */
router.post('/edit/:id', requireAuth, UserController.processEditPage);

/* GET request to perform Deletion - DELETE Operation */
router.get('/delete/:id', requireAuth, UserController.performDelete);

module.exports = router;
