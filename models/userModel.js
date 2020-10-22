let mongoose = require('mongoose');

//Create a model class
let userModel = mongoose.Schema({
username: String,
email: String,
displayName: String


},
{
    collection: "users"
});

module.exports = mongoose.model('User', userModel);