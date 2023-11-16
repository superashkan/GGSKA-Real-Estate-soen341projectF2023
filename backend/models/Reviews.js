const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    brokerLicense: { type: String, required: true },
    stars: { type: Number, min: 1, max: 5, required: true },
    comments: { type: String, required: true },
})
const ReviewModel = new mongoose.model("reviews", ReviewSchema)

module.exports = ReviewModel