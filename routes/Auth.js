const router = require('express').Router()
const { getAdminById } = require('../controllers/Admin')
const { login, register, isSignedIn, isAuthenticated, isAdmin, logout } = require('../controllers/Auth')

// Params
router.param('adminId',getAdminById)

// Routes
router.post('/signup',register)
router.post('/create/:adminId',isSignedIn,isAuthenticated,isAdmin,register)

router.post('/login',login)
router.get('/logout',logout)

module.exports = router