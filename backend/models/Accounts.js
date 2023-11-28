const mongoose = require('mongoose')


const AccountSchema = new mongoose.Schema({
    accountType: String,
    name: String,
    email: {type: String, unique: true},
    password: String,
    age: Number,
    phone_number: String,
    license_number: Number,
    agency: String,
})

const AccountModel = new mongoose.model("accounts", AccountSchema)
module.exports = AccountModel