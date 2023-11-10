const mongoose = require('mongoose')

const OfferSchema = new mongoose.Schema({
    address: { type: String, required: true },
    offer: { type: Number, min: 1, required: true },
    brokerName: {type: String, required: true},
    brokerLicense: {type: Number, required: true},
    brokerAgency: {type: String, required: true},
    clientInfo: {type: String, required: true},
    deedDate: {type: String, required: true},
    occupancyDate: {type: String, required: true},
})
const OfferModel = new mongoose.model("offers", OfferSchema)

module.exports = OfferModel