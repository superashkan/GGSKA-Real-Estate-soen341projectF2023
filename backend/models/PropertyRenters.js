const mongoose = require('mongoose')

const PropertyRenterSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
    age: Number,
    phone_number: String,
})

const PropertyRenterModel = new mongoose.model("property_renters", PropertyRenterSchema)

module.exports = PropertyRenterModel