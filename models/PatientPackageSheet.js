const mongoose = require('mongoose')

const patientPackageSheetSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    bill: {
        type: Number,
        required: true
    },
    patient_name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    reference_by: {
        type: String
    },
    doctor_fees: {
        type: Number,
        required: true
    },
    ncv: {
        type: String,
        required: true
    },
    nt: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    p1: {
        type: String,
        required: true
    },
    due: {
        type: Number,
        required: true
    },
    p2: {
        type: String,
        default: 0
    },
    p3: {
        type: String,
        default: 0
    },
    slot_day: {
        type: String,
        required: true
    },
    slot_time: {
        type: String,
        required: true
    },
    feedback: {
        type: String
    },
    second_sheet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SecondSheet'
    }
},{timestamps: true})

module.exports = mongoose.model("PatientPackage",patientPackageSheetSchema)