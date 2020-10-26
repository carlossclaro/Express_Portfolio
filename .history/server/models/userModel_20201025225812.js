// created by: Carlos Cruz-Claro 0N 2020-10-25 #300-902-439 
let mongoose = require('mongoose');

//Create a model class
let userModel = mongoose.Schema({
name: String,
email: String,
number: String

},
{
    collection: "b/users"
});

module.exports = mongoose.model('Users', userModel);