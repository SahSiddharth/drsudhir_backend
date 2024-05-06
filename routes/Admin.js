const router = require('express').Router()
const { getAdminById, getAllAdmins, getSingleAdmin, getRequestedAdminById, updateAccount, deleteAccount } = require('../controllers/Admin')
const { isSignedIn, isAdmin, isAuthenticated } = require('../controllers/Auth')

// Params
router.param('adminId',getAdminById)
router.param('requestedAdminId',getRequestedAdminById)

// Routes
// Admin Account Related Routes - Can only be accessed by Role 2 Admin
router.post('/admins/all/:adminId',isSignedIn,isAdmin,getAllAdmins)
router.post('/admin/:adminId/:requestedAdminId',isSignedIn,isAdmin,getSingleAdmin)
router.put('/admin/:adminId/:requestedAdminId',isSignedIn,isAdmin,updateAccount)
router.delete('/admin/remove/:adminId',isSignedIn,isAdmin,deleteAccount)

// Admin personal account related routes
router.put('/p/:adminId/:requestedAdminId',isSignedIn,isAuthenticated,updateAccount)
router.delete('/p/remove/:adminId/:requestedAdminId',isSignedIn,isAuthenticated,deleteAccount)


module.exports = router