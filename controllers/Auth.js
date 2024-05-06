const { expressjwt } = require("express-jwt")
const Admin = require("../models/Admin")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

exports.register = (req,res) => {
    const { fullname,email,contact,password,confirmPassword } = req.body

    if(!fullname || !email || !contact || !password || !confirmPassword){
        return res.status(400).json({error: "All fields are required!",body: ""})
    }

    if(password !== confirmPassword){
        return res.status(400).json({error: "Passwords did not matched!",body: "PWD_MISMATCH"})
    }

    try {
        Admin.findOne({email}).then(async (admin) => {
            if(admin){
                return res.status(400).json({error: "Email already exists!",body: ""})
            }

            let newAdmin = new Admin({fullname,email,contact})

            const hashedPassword = await bcrypt.hash(password,10)
            newAdmin.password = hashedPassword

            if(req.body.profile_picture){
                newAdmin.profile_picture = req.profile_picture
            }

            if(req.body.role){
                if(req.body.role < 2){
                    newAdmin.role = req.body.role
                }else{
                    return res.status(400).json({error: "Invalid admin role!",body: ""})
                }
            }

            newAdmin.save().then( savedAdmin => {
                return res.status(201).json({success: true,message: "Admin registered successfully!"})
            }).catch(error => {
                throw new Error(error)
            })
        }).catch(error => {
            throw new Error(error)
        })
    } catch (error) {
        return res.status(500).json({error: "Internal server error!",body: error})
    }
}

exports.login = (req,res) => {
    const { email,password } = req.body

    try {
        Admin.findOne({email}).then(async (admin) => {
            if(!admin){
                return res.status(400).json({error: "Invalid credentials!",body: ""})
            }

            const isCorrectPassword = await bcrypt.compare(password,admin.password)

            if(!isCorrectPassword){
                return res.status(400).json({error: "Invalid credentials!",body: ""})
            }

            const token = jwt.sign({_id: admin._id,role: admin.role},process.env.JWT_SECRET,{expiresIn: "1d"})
            res.cookie('jwt',token,{maxAge: 24*60*60*1000})

            return res.status(200).json({success: true,message:"Successfully Logged In.",body: {token,admin}})
        }).catch(error => {
            throw new Error(error)
        })
    } catch (error) {
        return res.status(500).json({error: "Internal server error!",body: error})
    }
}

exports.logout = (req,res) => {
    res.clearCookie('jwt')
    return res.status(200).json({success: true,message: "Logout successful.",body: ''})
}

// Middlewares

exports.isSignedIn = expressjwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth",
    algorithms: ['HS256']
})

exports.isAdmin = (req,res,next) => {
    if(req.auth.role === 2){
        next()
    }else{
        return res.status(400).json({error: "Unauthorized.",body: "You don't have permission to do this action."})
    }
}

exports.isModerator = (req,res,next) => {
    if(req.auth.role >= 1){
        next()
    }else{
        return res.status(400).json({error: "Unauthorized.",body: "You don't have permission to do this action."})
    }
}

exports.isAuthenticated = (req,res,next) => {
    if(req.admin.role === 2){
        next()
    }else{
        if(req.auth && req.admin && req.auth._id == req.admin._id){
            next()
        }else{
            return res.status(400).json({error: "Unauthorized.",body: "You don't have permission to do this action."})
        }
    }
}