const mongoose = require('mongoose')


const BrokerSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
})

const BrokerModel = new mongoose.model("brokers", BrokerSchema)

module.exports = BrokerModel