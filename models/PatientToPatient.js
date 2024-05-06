const mongoose = require('mongoose')

const patientToPatient = new mongoose.Schema({
    patient_name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    relation: {
        type: String,
        required: true
    },
    diagnosis: {
        type: String,
        required: true
    },
    apt_date: {
        type: String,
        required: true
    },
    feedback: {
        type: String
    }
},{timestamps: true})

module.exports = mongoose.model("PatientToPatient",patientToPatient)