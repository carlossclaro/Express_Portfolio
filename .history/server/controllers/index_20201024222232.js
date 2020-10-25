let express = require('express');
let router = express.Router();

//Easier to test this controller
module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home'});

}