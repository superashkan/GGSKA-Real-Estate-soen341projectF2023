const mongoose = require('mongoose')

const PropertySchema = new mongoose.Schema({
    address: { type: String, unique: true, required: true },
    brokerEmail: { type: String, required: false },
    goingPrice: { type: Number, min: 1, required: true },
    propertyType: {type: String, required: true },
    numBedrooms: { type: Number, min: 1, required: true },
    numBathrooms: { type: Number, min: 1, required: true },
    propertySize: { type: Number, min: 1, required: true },
    propertyImageURL: { type: String, required: false },
})
const PropertyModel = new mongoose.model("properties", PropertySchema)

module.exports = PropertyModel