let mongoose = require('mongoose');

//Create a model class
let businessModel = mongoose.Schema({
businessName: String,
businessEmail: String,
businessNumber: Number


},
{
    //GET collection from DB
    collection: "users"
});

module.exports = mongoose.model('User1', businessModel);