const mongoose = require('mongoose')

const secondSheet = new mongoose.Schema({
    patient_name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    age: {
        type: String
    },
    repg_date: {
        type: String
    },
    re_apt_date: {
        type: String
    },
    repkg_amount: {
        type: String
    },
    address: {
        type: String
    },
    diagnosis: {
        type: String
    },
    slot_day:{
        type: String,
        required: true
    },
    slot_time:{
        type: String,
        required: true
    },
    therapy_statring_date: {
        type: String
    },
    rm: {
        type: String
    },
    payment_info: {
        ncv_nt: {
            type: Number,
        },
        total: {
            type: Number
        },
        paid: {
            type: Number
        },
        due: {
            type: Number
        },
        pay_one: {
            type: Number
        },
        pay_two: {
            type: Number
        }
    },
    patient_to_patient_details: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PatientToPatient'
        }
    ]
},{timestamps: true})

module.exports = mongoose.model("SecondSheet",secondSheet)