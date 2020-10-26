//Require modules for the Guest Model 
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let guestUsers = mongoose.Schema(
    {
        username: 
        {
            type: String,
            default: '',
            trim: true,
            required: 'Username is required'
        },
        /*
        password: 
        {
            type: String,
            default: '',
            trim: true,
            required: 'Password is required'
        },
        */
       email:
       {
           type: String,
           default: '',
           trim: true,
           required: 'Email address is required'
       },
       displayName:
       {
           type: String,
           default: '',
           trim: true,
           required: 'Display name is required'
       },
       created:
       {
           type: Date,
           default: Date.now,
       },
       update:
       {
           type: Date,
           default: Date.now,
       },
    },
    {
        collection: "guestUsers"
    }
);

// Configure options for the Guest User Model
let options = ({missingPasswordError: 'Wrong / Missing password'});

guestUsers.plugin(passportLocalMongoose, options);

module.exports.guestUsers = mongoose.model('guestModel', guestUsers);
