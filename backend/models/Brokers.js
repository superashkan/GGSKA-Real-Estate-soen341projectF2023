const mongoose = require('mongoose')


const BrokerSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
    age: Number,
    phone_number: String,
    license_number: Number,
    agency: String,
})

const BrokerModel = new mongoose.model("brokers", BrokerSchema)

module.exports = BrokerModel