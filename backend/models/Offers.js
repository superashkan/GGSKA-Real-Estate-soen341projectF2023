const mongoose = require('mongoose')

const OfferSchema = new mongoose.Schema({
    address: { type: String, required: true },
    offer: { type: Number, min: 1, required: true },
})
const OfferModel = new mongoose.model("offers", OfferSchema)

module.exports = OfferModel