let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');


//Create guestUsers Model 
let guestUserModel = require('../models/guestUserModel');
let User = guestUserModel.User; 

//These controllers are easier to test when it's alone with a module

/* DISPLAY home page. */
module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home', displayName: req.user ? req.user.displayName: ''});
}

/* DISPLAY projects page. */
module.exports.displayProjectsPage = (req, res, next) => {
    res.render('projects', { title: 'Projects', displayName: req.user ? req.user.displayName: '' });
}

/* DISPLAY services page. */
module.exports.displayServicesPage = (req, res, next) => {
    res.render('services', { title: 'Services', displayName: req.user ? req.user.displayName: '' });
}

/* DISPLAY home page. */
module.exports.displayAboutMePage = (req, res, next) => {
    res.render('aboutme', { title: 'About Me', displayName: req.user ? req.user.displayName: '' });
}

/* DISPLAY contact page. */
module.exports.displayContactMePage = (req, res, next) => {
    res.render('contactme', { title: 'Contact Me', displayName: req.user ? req.user.displayName: '' });
}

/* DISPLAY login page. */
module.exports.displayLoginPage = (req, res, next) => {
    //Check if the user is already logged in 
    if(!req.user) {
        res.render('auth/login', 
        {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName: ''
        });
    }
    else {
        return res.redirect('/');
    }
   
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        //If server error
        if(err){
            return next(err);
        }
        //Is there a guest login error?
        if(!user){
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            //Server error?
            if(err){
                return next(err);
            }
            return res.redirect('/users')
        });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    //Check to see if user is already logged in
    if(!req.user) {
        res.render('auth/register', {
        title: 'Register',
        messages: req.flash('registerMessage'),
        displayName: req.user ? req.user.displayName: ''
        
    });
} else {
    return res.redirect('/');
}
}

module.exports.processRegisterPage = (req, res, next) => {
    //Instanctiate a guestUser object
    let newUser = new User({
        username: req.body.username,
        //password: req.body.password,
        email: req.body.email,
        displayName: req.body.displayName

    });
    User.register(newUser, req.body.password, (err) => {
        if(err) {
            console.log("Error: Inserting New User")
            if(err.name == "UserExistsError") {
                req.flash(
                    'registerMessage',
                    'Registration Error: User already exists!'
                );
                console.log('Error: User Already Exists')
            }
            return res.render('auth/register', {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName: ''
            });
        }
        else {
            //If no error exists, then registeration is successful

            //Redirect guestUser and auth them
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/users')
            })
        }
    })
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}