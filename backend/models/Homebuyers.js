const mongoose = require('mongoose')

const HomebuyerSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
    age: Number,
    phone_number: String,
})

const HomebuyerModel = new mongoose.model("homebuyers", HomebuyerSchema)

module.exports = HomebuyerModel