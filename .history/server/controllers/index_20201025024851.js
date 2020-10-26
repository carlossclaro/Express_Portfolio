let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');


//Create guestUsers Model 
let guestUserModel = require('../models/guestModel');
let guestUsers = guestUserModel.guestUsers; 

//These controllers are easier to test when it's alone with a module

/* DISPLAY home page. */
module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home', displayName: req.guestUsers ? req.guestUsers.displayName: ''});
}

/* DISPLAY projects page. */
module.exports.displayProjectsPage = (req, res, next) => {
    res.render('projects', { title: 'Projects', displayName: req.guestUsers ? req.guestUsers.displayName: '' });
}

/* DISPLAY services page. */
module.exports.displayServicesPage = (req, res, next) => {
    res.render('services', { title: 'Services', displayName: req.guestUsers ? req.guestUsers.displayName: '' });
}

/* DISPLAY home page. */
module.exports.displayAboutMePage = (req, res, next) => {
    res.render('aboutme', { title: 'About Me', displayName: req.guestUsers ? req.guestUsers.displayName: '' });
}

/* DISPLAY contact page. */
module.exports.displayContactMePage = (req, res, next) => {
    res.render('contactme', { title: 'Contact Me', displayName: req.guestUsers ? req.guestUsers.displayName: '' });
}

/* DISPLAY login page. */
module.exports.displayLoginPage = (req, res, next) => {
    //Check if the user is already logged in 
    if(!req.guestUsers) {
        res.render('auth/login', 
        {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.guestUsers ? req.guestUsers.displayName: ''
        });
    }
    else {
        return res.redirect('/');
    }
   
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, guestUsers, info) => {
        //If server error
        if(err){
            return next(err);
        }
        //Is there a guest login error?
        if(!guestUsers){
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(guestUsers, (err) => {
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
    if(!req.guestUsers) {
        res.render('auth/register', {
        title: 'Register',
        messages: req.flash('registerMessage'),
        displayName: req.guestUsers ? req.guestUsers.displayName: ''
        
    });
} else {
    return res.redirect('/');
}
}

module.exports.processRegisterPage = (req, res, next) => {
    //Instanctiate a guestUser object
    let newGuestUser = new guestUsers({
        username: req.body.username,
        //password: req.body.password,
        email: req.body.email,
        displayName: req.body.displayName

    });
    guestUsers.register(newGuestUser, req.body.password, (err) => {
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
                displayName: req.guestUsers ? req.guestUsers.displayName: ''
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