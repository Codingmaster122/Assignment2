let mongoose = require('mongoose');

//create a model class
let businessModel = mongoose.Schema({
    phone: String,
    name: String,
    email: String
},
{
    collections: "business"
});

module.exports = mongoose.model('Business',businessModel);