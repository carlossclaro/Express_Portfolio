let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//These controllers are easier to test when it's alone with a module

/* DISPLAY home page. */
module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home'});
}

/* DISPLAY projects page. */
module.exports.displayProjectsPage = (req, res, next) => {
    res.render('projects', { title: 'Projects' });
}

/* DISPLAY services page. */
module.exports.displayServicesPage = (req, res, next) => {
    res.render('services', { title: 'Services' });
}

/* DISPLAY home page. */
module.exports.displayAboutMePage = (req, res, next) => {
    res.render('aboutme', { title: 'About Me' });
}

/* DISPLAY contact page. */
module.exports.displayContactMePage = (req, res, next) => {
    res.render('contactme', { title: 'Contact Me' });
}

/* DISPLAY auth page. */
module.exports.displayAuthPage = (req, res, next) => {
    res.render('authenticate', { title: 'Authentication' });
}