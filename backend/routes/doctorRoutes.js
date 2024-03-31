const express = require('express')
const authorize = require('../middlewear/validateToken')
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

module.exports = doctorRouter