const PatientPackage = require('../models/PatientPackageSheet')
const SecondSheet = require('../models/SecondSheet')
const _ = require('lodash')

exports.getSecondSheetById = (req,res,next,id) => {
    try {
        SecondSheet.findById(id).then(data => {
            if(!data){
                return res.status(404).json({error: "Second sheet not found!",body: data})
            }

            req.secondSheet = data
            next()
        })
    } catch (error) {
        return res.status(500).json({error: "Internal server error!",body: error})
    }
}

exports.getPatientPackageById = (req,res,next,id) => {
    try {
        PatientPackage.findById(id)
        .populate('second_sheet')
        .then(data => {
            if(!data){
                return res.status(404).json({error: "Second sheet not found!",body: data})
            }

            req.patientPackage = data
            next()
        })
    } catch (error) {
        return res.status(500).json({error: "Internal server error!",body: error})
    }
}

exports.createPatientPackageData = (req,res,next) => {
    const {date,bill,patient_name,contact,reference_by,doctor_fees,total,slot_day,slot_time,ncv,nt,p1,due} = req.body

    if(!date || !bill || !patient_name || !contact || !reference_by || !doctor_fees || !total || !slot_day || !slot_time || !ncv || !nt || !p1 || !due ){
        return res.status(400).json({
            error: "Please fill all the fields",
            body: "Field can not be empty"
        })
    }

    try {
        const newPatientPackage = new PatientPackage(req.body)

        newPatientPackage.save().then(data => {
            if(!data){
                return res.status(500).json({error: "Faild to save patient package data.",body: data})
            }

            req.createdPackage = data
            next()
        })
    } catch (error) {
        return res.status(500).json({error: "Internal server error!",body: error})
    }
}

exports.createSecondSheet = (req,res) => {
    try {
        const {patient_name,contact,slot_day,slot_time,ncv,nt,total,p1,due} = req.createdPackage

        const payment_info = {
            total,
            ncv_nt: ncv + nt,
            pay_one: p1,
            due,
            paid: p1,
            pay_two: 0
        }

        const newSecondSheet = new SecondSheet({patient_name,contact,slot_day,slot_time,payment_info})

        newSecondSheet.save().then(data => {
            if(!data){
                return res.status(500).json({error: "Package created but faild to create second page data.",body: data})
            }

            PatientPackage.findByIdAndUpdate({_id: req.createdPackage._id},{$set: {second_sheet: data._id}},{new: true})
            .then( newData => {
                if(!newData){
                    return res.status(500).json({error: "Package created but faild to update patient package data.",body: newData})
                }

                return res.status(200).json({
                    message: "Patient package data saved successfully.",
                    body: newData
                })
            })
        })
    } catch (error) {
        return res.status(500).json({error: "Internal server error!",body: error})
    }
}

exports.updateSecondSheet = (req,res) => {
    try {
        let secondSheet = req.secondSheet
        secondSheet = _.extend(secondSheet,req.body)

        secondSheet.save().then( data => {
            if(!data){
                return res.status(400).json({error: "Something is not right!",body: ''})
            }

            return res.status(200).json({
                message: "Updated successfully.",
                body: data
            })
        })
    } catch (error) {
        return res.status(500).json({error: "Internal server error!",body: error})
    }
}

exports.getAllPatientPackages = (req,res) => {
    const limit = req.body.limit || 20
    const skipValue = req.body.pageNumber || 0
    try {
        PatientPackage.find()
        .skip(skipValue * limit)
        .limit(limit)
        .sort({createdAt: 'asc'})
        .then(data => {
            if(!data || data.length === 0 ) {
                return res.status(404).json({error: "No patient package found!",body: ''})
            }

            return res.status(200).json({
                message: "All patient packages.",
                body: data
            })
        })
    } catch (error) {
        return res.status(500).json({error: "Internal server error!",body: error})
    }
}

exports.getTotalNumberOfPackages = (req,res) => {
    try {
        PatientPackage.countDocuments()
        .then(data => {
            return res.status(200).json({
                message: "Total patient packages.",
                body: data
            })
        })
    } catch (error) {
        return res.status(500).json({error: "Internal server error!",body: error})
    }
} 

exports.getSinglePatientPackage = (req,res) => {
    if(req.patientPackage){
        return res.status(200).json({
            message: "Single patient package.",
            body: req.patientPackage
        })
    }else{
        return res.status(404).json({error: "No patient package found!",body: ''})
    }
}