const mongoose = require('mongoose')

const VisitSchema = new mongoose.Schema({
    propertyAddress: { type: String, required: true },
    visitorFullName: { type: String, required: true },
    visitorEmail: { type: String, required: true },
    visitDate: { type: String, required: true },
    visitTime: { type: String, required: true },
})
const VisitModel = new mongoose.model("visits", VisitSchema)

module.exports = VisitModel