const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0,
        enum: [0,1,2]
    },
    profile_picture: {
        type: String,
        default: ""
    }
},{timestamps: true})

module.exports = mongoose.model("Admin",AdminSchema)