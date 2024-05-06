const router = require('express').Router()

const { getAdminById } = require('../controllers/Admin')
const { isSignedIn, isAdmin } = require('../controllers/Auth')
const { createPatientPackageData, createSecondSheet, getSecondSheetById, updateSecondSheet, getAllPatientPackages, getTotalNumberOfPackages, getPatientPackageById, getSinglePatientPackage } = require('../controllers/Patient')

// Params
router.param("adminId",getAdminById)
router.param("sheetId",getSecondSheetById)
router.param("packageId",getPatientPackageById)

// Routes
router.post("/package/create/:adminId",isSignedIn,isAdmin,createPatientPackageData,createSecondSheet)
router.post("/package/update/sh/:adminId/:sheetId",isSignedIn,isAdmin,updateSecondSheet)
router.post("/package/all/:adminId",isSignedIn,isAdmin,getAllPatientPackages)
router.post("/package/all/:adminId",isSignedIn,isAdmin,getAllPatientPackages)
router.get("/package/count",getTotalNumberOfPackages)
router.get("/package/:packageId/:adminId",isSignedIn,isAdmin,getSinglePatientPackage)

module.exports = router