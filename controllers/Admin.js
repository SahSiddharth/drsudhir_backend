const Admin = require("../models/Admin")
const _ = require('lodash')

exports.getAdminById = (req,res,next,id) => {
    try {
        Admin.findById(id).then(admin => {
            if(!admin){
                return res.status(404).json({error: "No admin found.",body: admin.errors})
            }

            req.admin = admin
            next()
        }).catch(error => {
            throw new Error(error)
        })
    } catch (error) {
        return res.status(500).json({error: "Internal server error!",body: error})
    }
}

exports.getRequestedAdminById = (req,res,next,id) => {
    try {
        Admin.findById(id).select('-password').then(admin => {
            if(!admin){
                return res.status(404).json({error: "No admin found.",body: admin.errors})
            }

            req.requestedAdmin = admin
            next()
        }).catch(error => {
            throw new Error(error)
        })
    } catch (error) {
        return res.status(500).json({error: "Internal server error!",body: error})
    }
}

exports.getAllAdmins = (req,res) => {
    try {
        Admin.find().select('_id fullname email contact profile_picture role createdAt').then(admins => {
            if(admins.length === 0){
                return res.status(404).json({error: "No admins found.",body: admins})
            }

            return res.status(200).json({message: "Admins found.",body: admins,success: true})
        }).catch(error => {
            throw new Error(error)
        })
    } catch (error) {
        return res.status(500).json({error: "Internal server error!",body: error})
    }
}

exports.getSingleAdmin = (req,res) => {
    if(req.requestedAdmin){
        return res.status(200).json({message: "Admin found.",body: req.requestedAdmin,success: true})
    }
}

exports.updateAccount = (req,res) => {
    try {
        let admin = req.requestedAdmin
        admin = _.extend(admin,req.body)

        if(!handleRoleUpdate(req)){
            return res.status(400).json({error: "Unauthorized.",body: "You don't have permission to do this action."})
        }

        admin.save().then(savedAdmin => {
            return res.status(200).json({message: "Admin updated successfully.",body: admin,success: true})
        }).catch(error => {
            throw new Error(error)
        })
    } catch (error) {
        return res.status(500).json({error: "Internal server error!",body: {...error}})
    }
}

exports.deleteAccount = (req,res) => {
    try {
        Admin.findByIdAndDelete(req.body._id).then(deletedAccount => {
            if(!deletedAccount){
                return res.status(404).json({error: "Admin not found.",body: deletedAccount})
            }

            return res.status(200).json({message: "Admin deleted successfully.",body: deletedAccount,success: true})
        }).catch(error => {
            throw new Error(error)
        })
    } catch (error) {
        return res.status(500).json({error: "Internal server error!",body: error})
    }
}


const handleRoleUpdate = (req) => {
    if(req.body.role){
        if(req.admin._id == req.requestedAdmin._id){
            return false
        }else{
            if(req.admin.role < 2){
                return false
            }else{
                if(req.body.role > 1){
                    return false
                }else{
                    return true
                }
            }
        }
    }else{
        return true
    }
}