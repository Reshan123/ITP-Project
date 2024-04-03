const express = require('express')
const {authorize} = require('../middlewear/validateToken')
//controller imports
const doctorController = require('../controllers/doctorContoller')

//router
const doctorRouter = express.Router()

//routes
doctorRouter.get('/getAllDocs', doctorController.getAllDocs)

doctorRouter.post('/login', doctorController.login)

doctorRouter.post('/createDoctor', doctorController.createDoctor)

doctorRouter.put('/updateDoctorDetailsFromToken', authorize, doctorController.updateDoctorDetailsFromToken)

doctorRouter.delete('/deleteDoctorDetailsFromToken', authorize, doctorController.deleteDoctorDetailsFromToken)

doctorRouter.get('/availableDoctors', doctorController.getAvailableDoctors)

doctorRouter.put('/updateDoctorFromID/:docID', doctorController.updateDoctorFromID)

doctorRouter.delete('/deleteDoctorFromID/:docID', doctorController.deleteDoctorFromID)

module.exports = doctorRouter